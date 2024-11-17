
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ApplyForm = () => {
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [resume, setResume] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('applicantName', applicantName);
        formData.append('applicantEmail', applicantEmail);
        formData.append('resume', resume);
        formData.append('jobId', id);

        // API call to submit the application
        fetch('/api/apply', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setSuccessMessage('Application submitted successfully!');
                    setErrorMessage('');
                } else {
                    setErrorMessage('Error submitting application!');
                    setSuccessMessage('');
                }
            })
            .catch((error) => {
                setErrorMessage('Error submitting application!');
                setSuccessMessage('');
            });
    };

    return (
        <div className="max-w-md w-full bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-xl mx-auto mt-12">
            <h2 className="text-center text-3xl font-bold text-indigo-700 mb-6">Apply for Job</h2>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
            <form className="space-y-6 " onSubmit={handleSubmit}>
                <div>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >back</button>
                </div>
                <div>
                    <label htmlFor="applicant-name" className="block text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                        id="applicant-name"
                        name="applicant-name"
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your full name"
                    />
                </div>
                <div>
                    <label htmlFor="applicant-email" className="block text-sm font-semibold text-gray-700">Email</label>
                    <input
                        id="applicant-email"
                        name="applicant-email"
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="resume" className="block text-sm font-semibold text-gray-700">Resume</label>
                    <input
                        id="resume"
                        name="resume"
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files[0])}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-5 rounded-lg shadow-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                    >
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplyForm;
