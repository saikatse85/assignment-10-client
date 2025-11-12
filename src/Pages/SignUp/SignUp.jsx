import React, { use } from "react";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    setUser,
    signInGoogle,
    setLoading,
    createUserWithEmailPassword,
    signOutUser,
  } = use(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();

    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // ✅ Password validation
    const lengthPassword = /^.{6,}$/;
    const casePassword = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    const specialCharacterPassword = /^(?=.*[^A-Za-z0-9]).+$/;

    if (!lengthPassword.test(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    } else if (!casePassword.test(password)) {
      toast.error(
        "Password must include at least one uppercase and one lowercase letter"
      );
      return;
    } else if (!specialCharacterPassword.test(password)) {
      toast.error("Password should contain at least one special character");
      return;
    }

    // ✅ Create User
    createUserWithEmailPassword(email, password)
      .then((res) => {
        const user = res.user;

        // ✅ Update user profile info using Firebase updateProfile
        updateProfile(user, {
          displayName,
          photoURL,
        })
          .then(() => {
            setLoading(false);
            toast.success("✅ Sign up successful! Please log in to continue.");
            signOutUser();
            setUser(null);
            navigate("/login");
          })
          .catch((e) => toast.error(`Update failed: ${e.message}`));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("User already exists");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((res) => {
        setLoading(false);
        setUser(res.user);
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(255,0,150,0.1),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(0,200,255,0.15),_transparent_40%),linear-gradient(135deg,_#0b0c1d_0%,_#1a2147_50%,_#402f6b_100%)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="absolute w-48 h-48 bg-pink-500/30 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
      <div className="absolute w-64 h-64 bg-blue-500/30 rounded-full blur-3xl bottom-20 right-32 animate-pulse"></div>

      <div className="animate__animated animate__fadeInUp bg-gradient-to-br from-[#0d3c3b] to-[#0f7c76] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] rounded-3xl w-[320px] md:w-[400px] p-8 text-center">
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

        <h2 className="text-3xl font-semibold text-[#0f7c76] mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-gray-200 mb-6">Register for AI ModelVault</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="input text-gray-700 input-bordered w-full rounded-xl bg-gray-100 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            type="text"
            name="photo"
            placeholder="Image URL"
            className="input text-gray-700 input-bordered w-full rounded-xl bg-gray-100 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="input text-gray-700 input-bordered w-full rounded-xl bg-gray-100 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input text-gray-700 input-bordered w-full rounded-xl bg-gray-100 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <button
            type="submit"
            className="btn w-full mt-2 rounded-xl bg-gray-300 text-gray-700 border-none shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] hover:shadow-inner transition"
          >
            Sign Up
          </button>
        </form>

        <div className="divider text-gray-400 text-sm mt-6">
          OR CONTINUE WITH
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleGoogleSignIn}
            type="button"
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

        <p className="text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-300 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
