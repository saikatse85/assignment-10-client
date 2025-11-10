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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(_id);
      }
    });
  };

  return (
    <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 btn-primary-color text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          Purchased
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-[#004d40] bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-green-600">
          {name}
        </h3>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-semibold">Framework:</span> {framework}
          </p>
          <p>
            <span className="font-semibold">Use Case:</span> {useCase}
          </p>
          <p>
            <span className="font-semibold">Created By:</span> {createdBy}
          </p>
          <p>
            <span className="font-semibold">Purchased By:</span> {purchasedBy}
          </p>
          <p className="text-gray-500">
            Purchased on: {new Date(purchasedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-red-600 transition w-1/2 mr-2"
          >
            Delete
          </button>

          <Link
            to={`/model-details/${modelId || _id}`}
            className="px-4 py-2 btn-primary-color text-white rounded-lg hover:bg-green-700 transition w-1/2 ml-2 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPurchaseCard;
