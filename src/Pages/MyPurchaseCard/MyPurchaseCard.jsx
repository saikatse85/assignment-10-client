import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyPurchaseCard = ({ purchase, onDelete }) => {
  const {
    name,
    framework,
    useCase,
    createdBy,
    purchasedBy,
    image,
    purchasedAt,
    _id,
    modelId,
  } = purchase;

  // Confirm delete
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from My Purchase!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(_id);
      }
    });
  };

  return (
    <div className="bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute bottom-3 left-3 bg-teal-600/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
          Purchased
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
          {name}
        </h3>

        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Framework:
            </span>{" "}
            {framework || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Use Case:
            </span>{" "}
            {useCase || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Created By:
            </span>{" "}
            {createdBy || "Unknown"}
          </p>
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Purchased By:
            </span>{" "}
            {purchasedBy || "Unknown"}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Purchased on: {new Date(purchasedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:opacity-90 transition-all duration-200"
          >
            Delete
          </button>

          <Link
            to={`/model-details/${modelId || _id}`}
            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-medium text-center hover:opacity-90 transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPurchaseCard;
