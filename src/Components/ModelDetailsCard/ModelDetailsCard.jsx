import React from "react";
import { LuBrainCircuit } from "react-icons/lu";
import { MdOutlineDataset } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router";

const ModelDetailsCard = ({ model, user, handleDelete, handlePurchase }) => {
  const {
    name,
    framework,
    useCase,
    dataset,
    description,
    image,
    createdBy,
    createdAt,
    purchased,
  } = model;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass-card rounded-2xl shadow-xl border border-white/10 overflow-hidden transition hover:shadow-2xl hover:-translate-y-1 duration-300">
        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 duration-500"
          />
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
            Purchased : {purchased} times
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0d3c3b] to-[#0f7c76] bg-clip-text text-transparent">
            {name}
          </h2>

          {/* Info Grid */}
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/60 dark:bg-black/30 backdrop-blur px-3 py-2 rounded-lg border border-gray-200/50">
              <LuBrainCircuit className="text-[#0f7c76]" />
              <span className="font-medium">Framework:</span> {framework}
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-black/30 backdrop-blur px-3 py-2 rounded-lg border border-gray-200/50">
              <MdOutlineDataset className="text-[#0f7c76]" />
              <span className="font-medium">Dataset:</span> {dataset}
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-black/30 backdrop-blur px-3 py-2 rounded-lg border border-gray-200/50">
              <BsPersonFill className="text-[#0f7c76]" />
              <span className="font-medium">By:</span> {createdBy}
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FaRegClock /> Created on:{" "}
            {new Date(createdAt).toLocaleDateString()}
          </div>

          {/* Use Case */}
          <div className="p-4 bg-gradient-to-br from-[#0d3c3b]/10 to-[#0f7c76]/10 rounded-xl border border-[#0f7c76]/20">
            <h3 className="font-semibold text-lg mb-1 text-[#0d3c3b]">
              Use Case
            </h3>
            <p className="text-sm">{useCase}</p>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-white/50 dark:bg-black/30 backdrop-blur border border-gray-200/50">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-sm leading-relaxed">{description}</p>
          </div>

          <div className="flex gap-4 mt-4">
            {createdBy === user?.email && (
              <>
                <Link
                  type="btn"
                  to={`/update-model/${model._id}`}
                  className="flex-1 px-4 py-2 bg-[#0f7c76] text-white text-center rounded-lg hover:bg-[#0d3c3b] transition"
                >
                  Update Model
                </Link>

                <button
                  onClick={() => handleDelete(model._id)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Delete
                </button>
              </>
            )}
            <button
              onClick={() => handlePurchase(model)}
              className="flex-1 px-4 py-2 bg-white text-[#0f7c76] rounded-lg border border-[#0f7c76] hover:bg-[#0f7c76] hover:text-white transition"
            >
              Purchase Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsCard;
