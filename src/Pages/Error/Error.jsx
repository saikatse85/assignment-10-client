import React from "react";
import pageNotFount from "../../assets/pageNotFound.png";
import { Link } from "react-router";

const Error = () => {
  return (
    <div>
      <img src={pageNotFount} alt="" />
      <p className="mt-3 text-gray-200 text-center mt-8">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="flex items-center justify-center">
        <Link
          to="/"
          className="mt-6 btn-primary-color text-white px-5 py-2 rounded-full shadow hover:bg-blue-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
