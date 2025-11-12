import React, { use, useState } from "react";
import { FaGoogle, FaGithub, FaTwitter, FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setUser, signInWithEmailPassword, signInGoogle, setLoading } =
    use(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    setLoading(true);
    signInWithEmailPassword(email, password)
      .then(async (res) => {
        await res.user.reload();
        setLoading(false);
        setUser(res.user);
        toast.success("Sign In Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((res) => {
        setLoading(false);
        setUser(res.user);
        toast.success("Successfully Login with Google");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(255,0,150,0.1),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(0,200,255,0.15),_transparent_40%),linear-gradient(135deg,_#0b0c1d_0%,_#1a2147_50%,_#402f6b_100%)] relative overflow-hidden">
      {/* Background decorative dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Soft animated blobs */}
      <div className="absolute w-48 h-48 bg-pink-500/30 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
      <div className="absolute w-64 h-64 bg-blue-500/30 rounded-full blur-3xl bottom-20 right-32 animate-pulse"></div>

      {/* ✨ Redesigned Form Box */}
      <div className="animate__animated animate__fadeInUp bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-3xl w-[320px] md:w-[400px] p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
        {/* User Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-teal-400/30 to-emerald-300/20 flex items-center justify-center shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-teal-600 dark:text-teal-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.486 0 4.787.635 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-[#0d3c3b] dark:text-gray-100 mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Login to AI ModelVault
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-xl bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 py-3 px-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full rounded-xl bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 py-3 px-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-teal-500 cursor-pointer transition"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Options */}
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-xs accent-teal-500"
              />
              Remember me
            </label>
            <Link className="hover:underline text-teal-500">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-3 rounded-xl btn-primary-color text-white py-3 font-semibold shadow-[0_4px_14px_rgba(45,212,191,0.4)] hover:shadow-[0_6px_20px_rgba(45,212,191,0.6)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-gray-400 text-sm mt-6">
          OR CONTINUE WITH
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-900/60 shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.15)] hover:scale-105 transition"
          >
            <FaGoogle className="text-teal-500" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-900/60 shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.15)] hover:scale-105 transition">
            <FaGithub className="text-gray-600 dark:text-gray-300" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-900/60 shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.15)] hover:scale-105 transition">
            <FaTwitter className="text-sky-500" />
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
