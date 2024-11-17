import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";

const UploadJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/upload", data);
      console.log("Job uploaded successfully:", response.data);
      alert("Job uploaded successfully");
    } catch (error) {
      console.error("Error uploading job:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-xl">
      <h2 className="text-center text-3xl font-extrabold text-indigo-700 mb-8">
        Upload Job
      </h2>

      <form
        className="space-y-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Job Title
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                Job title is required
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Company
            </label>
            <input
              {...register("company", { required: true })}
              type="text"
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">
                Company is required
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Location
            </label>
            <input
              {...register("location", { required: true })}
              type="text"
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                Location is required
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Salary
            </label>
            <input
              {...register("salary", { required: true })}
              type="number"
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">
                Salary is required
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Contact Email
            </label>
            <input
              {...register("contactEmail", { required: true })}
              type="email"
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm mt-1">
                Contact email is required
              </p>
            )}
          </div>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadJob;