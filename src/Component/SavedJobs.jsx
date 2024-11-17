
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store/store.jsx";
import axios from "axios";
import { useEffect } from "react";

const SavedJobs = () => {
  const { savejob, productdetailshandler, savedelete,savejobs } = useStore();
  const navigate = useNavigate();
  const {id} = useParams();

  const handleViewDetails = (job) => {
    productdetailshandler(job);
    navigate(`/productdetail/${job._id}`);
  };

  const saveJobHandler = async () => {

    savejobs(id);

  };


  const handleDelete = (job) => {
    savedelete(job);
  };

  useEffect(() => {
    saveJobHandler();
  }, []);

  return (
    <div className="ml-64 bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          Saved Jobs
        </h1>

        {savejob.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You haven't saved any jobs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savejob.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-700 text-sm font-medium mb-1">
                  {job.company}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  Location: {job.location}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  Salary: {job.salary}
                </p>
                <p className="text-blue-600 text-sm font-semibold mb-4">
                  {job.type}
                </p>

                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => handleViewDetails(job)}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(job)}
                    className="w-full py-2 px-4 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
