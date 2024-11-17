import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/store";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { loginhandler } = useStore();

  const onSubmit = async (data) => {
    try {
      await loginhandler(data);
      navigate("/"); // Adjust this path to wherever you want to navigate after login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white-500 to-zinc-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-2 text-center text-4xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errors && (
            <div className="text-red-500 text-sm mb-4">
              {Object.keys(errors).map((key, index) => (
                <p key={index}>{errors[key].message}</p>
              ))}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email-address"
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 3, message: "Password must be at least 3 characters" },
                  maxLength: { value: 8, message: "Password cannot exceed 8 characters" },
                })}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              Sign In
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
