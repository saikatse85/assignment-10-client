import React from "react";
import { Link } from "react-router";

const MyPurchaseCard = ({ purchase }) => {
  const { name, image, purchasedAt, modelId } = purchase;

  return (
    <div className="card bg-white/50 shadow-md rounded-xl p-4 hover:shadow-xl transition">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-500">
        Purchased on: {new Date(purchasedAt).toLocaleDateString()}
      </p>
      <div className="card-actions justify-end">
        <Link
          to={`/model-details/${modelId}`}
          className="btn btn-primary-color text-white"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default MyPurchaseCard;
