import React, { useEffect } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const Filter = () => {
   


  return (
    <div >
      <h2 className="text-xl font-semibold mb-4">Filter Job</h2>
      <div className="flex flex-wrap gap-3 p-2 rounded-lg">
       
        <button
        
          type="button"
          className="w-auto px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          All Jobs
        </button>
        <button
         
          type="button"
          className="w-auto px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          React
        </button>
        <button
         
          type="button"
          className="w-auto px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Javascript
        </button>

        <button
        
         className="w-auto px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">Node Js</button>
      </div>
    </div>
  );
};

export default Filter;
