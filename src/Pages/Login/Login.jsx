import React, { use, useState } from "react";
import { FaGoogle, FaGithub, FaTwitter, FaEye } from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { IoEyeOff } from "react-icons/io5";

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
        toast.success("Successfully Login with google");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(255,0,150,0.1),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(0,200,255,0.15),_transparent_40%),linear-gradient(135deg,_#0b0c1d_0%,_#1a2147_50%,_#402f6b_100%)] relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[size:24px_24px]"></div>

      <div class="absolute w-48 h-48 bg-pink-500/30 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
      <div class="absolute w-64 h-64 bg-blue-500/30 rounded-full blur-3xl bottom-20 right-32 animate-pulse"></div>
      <div className="animate__animated animate__fadeInUp bg-gray-100 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] rounded-3xl w-[320px] md:w-[400px] p-8 text-center">
        {/* User Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full shadow-[1px_1px_2px_#d1d9e6,-1px_-1px_2px_#ffffff] flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-500"
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
        <h2 className="text-2xl font-semibold text-gray-700 mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Login to AI Model Inventory Manager
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="input input-bordered w-full rounded-xl bg-gray-100 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-xl bg-gray-100 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-3 text-gray-400 cursor-pointer"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Options */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-xs" />
              Remember me
            </label>
            <Link className="hover:underline">Forgot password?</Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full mt-2 rounded-xl bg-gray-200 text-gray-700 border-none shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] hover:shadow-inner transition"
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
            type="submit"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-inner transition"
          >
            <FaGoogle className="text-gray-500" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-inner transition">
            <FaGithub className="text-gray-500" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-inner transition">
            <FaTwitter className="text-gray-500" />
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          Don't have an account?
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
