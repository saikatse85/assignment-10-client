import React, { Children, use } from "react";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { Navigate } from "react-router";
import { ScaleLoader } from "react-spinners";

const PrivateRout = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#00FF00"></ScaleLoader>
      </div>
    );
  } else if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRout;
