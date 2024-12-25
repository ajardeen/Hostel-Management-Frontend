import React, { useState, useEffect, useContext } from "react";
import registerSideImage1 from "../assets/register-side-image 1.webp";
import registerSideImage2 from "../assets/register-side-image 2.webp";
import registerSideImage3 from "../assets/register-side-image 3.avif";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../services/AuthProvider";
import LoadingButton from "../components/LoadingButton";
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const { login,role } = useAuth();
  //slider image
  const images = [registerSideImage1, registerSideImage2, registerSideImage3];
  //react hooks
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  //user Login
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Handle form submission to login user
    try {
      setIsLoading(true);
      await API
        .post("/login", { email, password })
        .then((res) => {
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
          login(res.data.token, res.data.role); //save token in useAuth because of its successfully logged in

          setTimeout(() => {
            setIsLoading(false);
            navigate(`/${res.data.role}`);
          }, 1200);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          toast.error("login error");
        });
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-white">
      {/* Left Side - Sign In Form */}
      <div className="w-full lg:w-1/2 px-6 py-12 lg:px-16 xl:px-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-1">Login</h1>
          <p className="text-gray-500 mb-8">Login page</p>

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
            <LoadingButton
              isLoading={isLoading}
              text={"Login"}
              style={
                "w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              }
            />

            <button
              className="bg-indigo-100 hover:bg-indigo-500 text-white rounded-xl p-1"
              onClick={() => {
                setEmail("azardevacc@gmail.com");
                setPassword("azardev@123");
              }}
            >
              Admin login
            </button>
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
                  className="w-[40rem] rounded-lg "
                />
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Share And Care</h2>
                <p className="text-gray-500">
                  Best Place to Share and relax yourself feel like home and
                  Secure
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
