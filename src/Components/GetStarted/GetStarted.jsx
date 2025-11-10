import React from "react";
import { useNavigate } from "react-router";

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="py-15">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center text-white">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#0d3c3b]">
            Ready to Manage <span className="text-[#0f7c76]">AI Models?</span>
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600  mb-10 max-w-2xl mx-auto">
            Join our platform to version, share, and deploy AI models
            effortlessly. Start optimizing your machine learning workflow today!
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-2 rounded-full font-semibold text-white btn-primary-color hover:from-green-500 hover:to-teal-600 shadow-lg transform transition hover:scale-105"
            >
              Register
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-2 rounded-full font-semibold btn-primary-color text-white hover:bg-gray-100 shadow-lg transform transition hover:scale-105"
            >
              Log In
            </button>
          </div>

          {/* Optional Illustration */}
          <div className="mt-12 flex justify-center">
            <img
              src="https://i.ibb.co.com/TxKM2XFC/ai.jpg"
              alt="AI Workflow"
              className="w-full max-w-lg rounded-3xl shadow-2xl hover:scale-105 transform transition duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
