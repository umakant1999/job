
import { useEffect, useState } from "react";
import useStore from "../store/store";

const Recom = () => {
  const { 
    userData, 
    fetchUserData, 
    loading, 
    error 
  } = useStore();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  useEffect(() => {
    randomJob()
  }, []);

  const randomJob = () => {
    if (userData.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * userData.length);
    return userData[randomIndex];
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Recommended Jobs
      </h1>
      <div className="flex flex-wrap justify-center">
        {userData.map((job, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={job.image} alt={job.title} className="w-full h-48 object-cover object-center" />
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-4">{job.company}</p>
                <p className="text-gray-600 mb-4">{job.location}</p>
                <p className="text-gray-600 mb-4">{job.date}</p>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <p className="text-gray-600 mb-4">{job.requirements}</p>
                <p className="text-gray-600 mb-4">{job.responsibilities}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recom;
