const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Job = require('./Model/jobmodel.js');
const User = require('./Model/usermodel.js');

require('dotenv').config();



app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET ;

mongoose.connect(process.env.MOONGOOSE_SECRET, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

app.get('/api/job', async (req, res) => {
    try {
        const jobs = await Job.find();
        
        res.json(jobs);
       
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

app.get('/savedjobs/:userId', verifyToken, async (req, res) => {
    const { userId } = req.params;
    try {
        const savedJobs = await Job.find({ userId });
        res.json(savedJobs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch saved jobs for user' });
    }
});

app.post('/saved', verifyToken, async (req, res) => {
    const { salary, title } = req.body;
    try {
        const job = new Job({ ...req.body, userId: req.user._id });
        await job.save();
        res.status(201).json({ message: 'Job saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save job' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid email' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        res.json({
            message: 'Login successful',
            token,
            user: user,
        });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, JWT_SECRET);
        res.status(201).json({
            message: 'Signup successful',
            token,
            userId: newUser._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Signup failed' });
    }
});

app.post('/upload', verifyToken, async (req, res) => {
    const { title, salary, location, description, company, contactEmail } = req.body;
    try {
        const job = new Job({ title, salary, location, description, company, contactEmail, userId: req.user._id });
        await job.save();

        res.status(201).json({ message: 'Job saved successfully' });
    } catch (err) {
        console.error('Error saving job:', err);
        res.status(500).json({ error: 'Failed to save job', details: err.message });
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});