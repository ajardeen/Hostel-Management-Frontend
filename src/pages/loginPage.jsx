import React, { useState, useEffect } from "react";
import registerSideImage1 from "../assets/register-side-image 1.webp";
import registerSideImage2 from "../assets/register-side-image 2.webp";
import registerSideImage3 from "../assets/register-side-image 3.avif";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../services/AuthProvider";
import LoadingButton from "../components/LoadingButton";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const { login } = useAuth();
  const images = [registerSideImage1, registerSideImage2, registerSideImage3];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await API.post("/login", { email, password });
      toast.success(res.data.message);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: res.data.token,
          userid: res.data.userid,
          role: res.data.role,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          username: res.data.username,
          email: res.data.email,
        })
      );
      login(res.data.token, res.data.role);
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/${res.data.role}`);
      }, 1200);
    } catch (error) {
      setIsLoading(false);
      toast.error("Login failed");
      console.error(error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, type: "spring" },
    },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, type: "spring" },
    },
  };

  return (
    <>
      <motion.div
        className="relative flex min-h-screen justify-center items-center bg-gradient-to-br from-purple-100 to-blue-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute top-8 text-4xl font-bold text-center py-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Hostel Management System
        </motion.div>
        <div className="flex w-full max-w-7xl mx-auto px-4 mt-20">
          {/* Left Side - Sign In Form */}
          <motion.div
            className="w-full lg:w-1/2 px-6 py-12 lg:px-16 xl:px-24"
            variants={formVariants}
          >
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                Welcome Back!
              </h1>
              <p className="text-gray-600 mb-8 text-center">
                Login to your account
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-shadow duration-300 ease-in-out"
                      placeholder="Your email address"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-shadow duration-300 ease-in-out"
                      placeholder="Your password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <LoadingButton
                  isLoading={isLoading}
                  text={"Login"}
                  style={
                    "w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-300"
                  }
                />
              </form>
              <p className="text-sm opacity-50 mt-4">Click to copy admin</p>
              <div className="flex items-center justify-between ">
                
              <div className=" text-sm">
                <span className="text-gray-700">Email:
                <span
                  className="text-indigo-600 cursor-pointer hover:text-indigo-700"
                  onClick={() => {
                    navigator.clipboard.writeText("azardevacc@gmail.com");
                    toast.success("Email copied to clipboard");
                  }}
                >
                  azardevacc@gmail.com
                </span>
                </span>
              </div>
              <div className="mt-1 text-sm">
                <span className="text-gray-700">Pass:
                <span
                  className="text-indigo-600 cursor-pointer hover:text-indigo-700"
                  onClick={() => {
                    navigator.clipboard.writeText("azardev@123");
                    toast.success("Password copied to clipboard");
                  }}
                >
                  azardev@123
                </span>
                </span>
              </div>
             
              </div>
              <p className="mt-8 text-center text-sm text-gray-600 flex justify-center gap-1">
                Don't have an account?{" "}
                <Link to={"/register"}>
                  <span className="text-purple-600 hover:text-purple-500 transition-colors duration-200">
                    Register here
                  </span>
                </Link>
              </p>
              <div className="text-xs opacity-70 text-center">Please check readme for demo login credentials in file</div>
            </div>
           
          </motion.div>

          {/* Right Side - Preview */}
          <motion.div
            className="hidden lg:block lg:w-1/2"
            variants={imageVariants}
          >
            <div className="h-full flex items-center justify-center px-8">
              <div className="max-w-2xl">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <motion.img
                      src={images[currentSlide]}
                      alt="Dashboard preview"
                      className="w-full h-[400px] rounded-lg object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                      Share And Care
                    </h2>
                    <p className="text-gray-600">
                      Best Place to Share and relax yourself feel like home and
                      Secure
                    </p>

                    <div className="flex justify-center gap-2 mt-6">
                      {[0, 1, 2].map((index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full ${
                            currentSlide === index
                              ? "bg-purple-600"
                              : "bg-gray-300 hover:bg-gray-400"
                          } transition-colors duration-300`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <ToastContainer />
      </motion.div>
    </>
  );
}