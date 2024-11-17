import { useStore } from "../store/store";
import { Link, useNavigate, useParams } from "react-router-dom";

const Productdetail = () => {
  const { productdetails } = useStore();
  const navigate = useNavigate();
  const prams = useParams();
  console.log(prams)


  if (!productdetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <button 
          onClick={() => navigate(-1)} // Navigate back to previous page
          className="text-blue-500 hover:underline mb-4 font-medium"
        >
          &larr; Back to Jobs
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{prams.title}</h1>
        <p className="text-gray-600 text-lg font-semibold mb-2 text-center">{prams.company}</p>
        
        <div className="flex items-center justify-center text-gray-500 text-sm mb-4">
          <svg
            className="w-5 h-5 mr-1 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{productdetails.location}</span>
        </div>

        <p className="text-green-600 text-xl font-semibold mb-4 text-center">Salary: {productdetails.salary}</p>

        <div className="text-gray-700 leading-relaxed mb-6 text-justify border-t pt-4 opacity-85">
          {productdetails.description}
        </div>
        
        <div className="flex justify-between text-gray-700 text-lg font-semibold mb-4">
          <span>Work Mode: {productdetails.workMode}</span>
          <span>Date: {productdetails.date}</span>
        </div>

        <Link
          to={`/applyform/${productdetails._id}`}
         className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mt-6">
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default Productdetail;
