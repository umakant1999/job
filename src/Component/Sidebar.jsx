import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/store";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { filterProduct, handleLogout, user } = useStore();
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser  = localStorage.getItem("user");
    if (storedUser ) {
      const user = JSON.parse(storedUser );
      setUsername(user.name);
    }
  }, [user]);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const iconVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 },
  };

  const toggleButtonVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };

  return (
    <div className="sticky top-0 left-0 z-50 w-full h-screen shadow-lg">
      <motion.button
        className="md:hidden p-2"
        onClick={handleToggleSidebar}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={toggleButtonVariants}
      >
        {isOpen ? (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            color="white"
            variants={iconVariants}
            animate="open"
            transition={{ duration: 0.8 }}
          >
            <motion.path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></motion.path>
          </motion.svg>
        ) : (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 50 50"
          >
            <motion.path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></motion.path>
          </motion.svg>
        )}
      </motion.button>

      <div
        className={`fixed left-0 top-0 min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-72 w-72 rounded-r-lg`}
      >
        <button
          className="md:hidden text-white"
          onClick={handleToggleSidebar}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            color="white"
            variants={iconVariants}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 1 }}
          >
            <motion.path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.031 25 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></motion.path>
          </motion.svg>
        </button>

        {/* Sidebar Content */}
        <h1 className="text-3xl font-bold mb-10 text-blue-400">Job Portal</h1>
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <motion.img
              src="https://thumbs.dreamstime.com/b/business-man-12515547.jpg"
              alt="User  Avatar"
              className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-lg object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
            <motion.div className="ml-4">
              <motion.p className="text-lg font-medium">Welcome back!</motion.p>
              <motion.p className="text-sm text-gray-400">{username}</motion.p>
              {user && (
                <motion.button
                  className="bg-red-500 mt-2 hover:bg-red-600 text-white font-bold py-1.5 px-3 rounded-lg shadow-sm"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Log Out
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative">
            <motion.input
              type="text"
              onChange={(e) => filterProduct(e.target.value)}
              placeholder="Search jobs..."
              className="w-full px-5 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-600"
                }`
              }
            >
              All Jobs
            </NavLink>
            <NavLink
              to="/savedjobs"
              className={({ isActive }) =>
                `w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-600"
                }`
              }
            >
              Saved Jobs
            </NavLink>
            <NavLink
              to="/appliedjobs"
              className={({ isActive }) =>
                `w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-600"
                }`
              }
            >
              Applied Jobs
            </NavLink>
            {username ? (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-600"
                  }`
                }
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-600"
                  }`
                }
              >
                Login
              </NavLink>
            )}
            <NavLink
              to="/uploadjob"
              className={({ isActive }) =>
                `w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-600"
                }`
              }
            >
              Upload Job
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;