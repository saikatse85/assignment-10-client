import React, { useState } from "react";
import { Link } from "react-router";

const ModelCard = ({ model }) => {
  const { _id, name, framework, description, image, averageRating } = model;
  const [hovered, setHovered] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(averageRating || 0);

  // Rating handler
  const handleRate = (rate) => {
    setUserRating(rate);

    fetch(`http://localhost:3000/models/${_id}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: rate }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAvgRating(data.averageRating); // update average
      })
      .catch((err) => {
        console.error("Error rating model:", err);
      });
  };

  return (
    <div>
      <div
        className="card bg-base-100 shadow-sm transition-transform transform hover:scale-105 h-[480px] flex flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <figure>
          <img
            src={image}
            alt={name}
            className={`h-48 w-full p-2 object-cover rounded-lg transition-all ${
              hovered ? "animate__animated animate__fadeIn" : ""
            }`}
          />
        </figure>

        <div
          className={`card-body transition-all ${
            hovered ? "animate__animated animate__fadeInUp" : ""
          }`}
        >
          <h2 className="card-title">{name}</h2>
          <p className="text-sm font-medium text-gray-500">{framework}</p>
          <p>{description.split(" ").slice(0, 23).join(" ")}...</p>

          {/* Rating display */}
          <div className="mt-2 flex items-center space-x-2">
            <span className="font-medium">Rating:</span>
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => handleRate(i)}
                className={`text-xl ${
                  i <= userRating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({avgRating.toFixed(1)})
            </span>
          </div>

          <div className="card-actions justify-end mt-2">
            <Link
              to={`/model-details/${_id}`}
              className="btn btn-primary-color text-white"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
