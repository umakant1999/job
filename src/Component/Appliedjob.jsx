import React, { useState, useEffect } from "react";

const AppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    const fetchJobs = async () => {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAppliedJobs([
          {
            id: 1,
            title: "Software Engineer",
            company: "ABC Corporation",
            location: "New York",
            dateApplied: "2022-01-01",
            status: "Pending",
          },
          {
            id: 2,
            title: "Data Scientist",
            company: "XYZ Inc.",
            location: "San Francisco",
            dateApplied: "2022-02-01",
            status: "Pending",
          },
        ]);
      } catch (err) {
        setError("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          back
        </button>
      </div>
      {appliedJobs.map((job) => (
        <div
          key={job.id}
          className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>
          <p className="text-lg text-gray-600 mb-1">{job.company}</p>
          <p className="text-lg text-gray-600 mb-1">{job.location}</p>
          <p className="text-lg text-gray-600 mb-1">
            Applied on: {job.dateApplied}
          </p>
          <p className="text-lg text-gray-600 mb-4">Status: {job.status}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Withdraw Application
          </button>
        </div>
      ))}
    </>
  );
};

export default AppliedJob;
