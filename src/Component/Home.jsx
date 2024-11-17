
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/store.jsx';
import Filter from './Filter';
import Recom from './Recom.jsx';

const Home = () => {
  const { 
    userData, 
    search, 
    fetchUserData, 
    loading, 
    error, 
    savejobs, 
    productdetailshandler, 
    theme, 
    themehandler 
  } = useStore();
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState(search);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    setFilteredJobs(search);
  }, [search]);

  const handleFilter = (e) => {
    const filtered = search.filter((job) => job.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredJobs(filtered);
  };

  if (loading) return (
    <div className="loader flex items-center justify-center h-screen text-gray-600 z-50">
      <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className='text-5xl'>Loading...</span>
    </div>
  );

  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  const handleViewDetails = (job) => {
    productdetailshandler(job);
    navigate(`/productdetail/${job.id}`);
  };

  return (
    <div className={`${theme ? "bg-green-700" : "bg-slate-500"} flex flex-col min-h-screen  text-white`}>
      <div className="flex-1 p-4 sm:p-8 md:ml-64 bg-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8">Available Jobs</h2>
        <input 
          type="text" 
          placeholder="Search jobs" 
          className="w-full p-2 mb-4 rounded-lg"
          onChange={handleFilter}
        />
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No jobs available at the moment</p>
        ) : (
          <div className="container ml-5 mx-auto grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleViewDetails(job)}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 gradient text-white"
                role="button"
                tabIndex={0}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <motion.h3 className="text-lg sm:text-xl font-semibold text-black">{job.title}</motion.h3>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">{job.description}</p>
                    </div>
                    <div>
                      {new Date(job.date).toLocaleDateString() === new Date().toLocaleDateString() && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-black">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-black">$ {job.salary}</span>
                    </div>
                    <div className='flex justify-between items-center text-gray-600'>
                      <span className="text-gray-600">Posted by Umakant</span>
                      <span>Date: {new Date(job.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-2">
                    <Link
                      to={`/applyform/${job._id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Apply Now
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        savejobs(job);
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Save Job
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
