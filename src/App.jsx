import React from 'react';
import Footer from './Component/Footer';
import Home from './Component/Home';
import { Route, Routes } from 'react-router-dom';
import SavedJobs from './Component/SavedJobs';
import Sidebar from './Component/Sidebar';
import Login from './Component/Login';
import Register from './Component/Register';
import UploadJob from './Component/Uploadjob';
import ApplyForm from './Component/Applyform';
import AppliedJob from './Component/Appliedjob';
import Ai from './Component/Ai';
import Synth from './Component/Synth';
import Dashboard from './Component/Dashboard';
import Productdetail from './Component/Productdetail';

const App = () => {

  
  


  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar />

      <div className="">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/savedjobs/:id' element={<SavedJobs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/uploadjob' element={<UploadJob />} />
          <Route path='/applyform/:id' element={<ApplyForm />} />
          <Route path='/appliedjob' element={<AppliedJob />} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/productdetail/:id' element={<Productdetail/>} />
        </Routes>
      </div>

      
    </div>
  );
}

export default App;
