import React, { useState } from "react";
import registerSideImage1 from "../assets/register-side-image 1.webp";
import registerSideImage2 from "../assets/register-side-image 2.webp";
import registerSideImage3 from "../assets/register-side-image 3.avif";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  //api url
  const api = import.meta.env.VITE_API_URL;

  const images = [registerSideImage1, registerSideImage2, registerSideImage3];
  //user Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission to logn user
    try {
      await axios
        .post(api + "/login", { email, password })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          localStorage.setItem('token',res.data.token)
        })
        .catch((err) => {
          console.log(err);
          toast.error("incorrect password");
        });
    } catch (error) {
        toast.error(error)
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      {/* Left Side - Sign In Form */}
      <div className="w-full lg:w-1/2 px-6 py-12 lg:px-16 xl:px-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-1">Login</h1>
          <p className="text-gray-500 mb-8">Student Login page</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Email address"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Password (min. 8 character)"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              SignIn
            </button>
            {/* Google sign in  */}
            {/* 
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Google className="w-5 h-5" />
              Sign up with Google
            </button> */}
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 flex justify-center gap-1">
            Don't have an account?{" "}
            <Link to={"/register"}>
              <span className="text-purple-600 hover:text-purple-500">
                Register here
              </span>
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Preview */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-50">
        <div className="h-full flex items-center justify-center px-8">
          <div className="max-w-2xl">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                <img
                  src={images[currentSlide]}
                  alt="Dashboard preview"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  92+ Ready Coded Blocks
                </h2>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Turpis morbi pulvinar venenatis non.
                </p>

                <div className="flex justify-center gap-2 mt-6">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full ${
                        currentSlide === index ? "bg-gray-800" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
