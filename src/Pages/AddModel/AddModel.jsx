import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router";

const AddModel = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const handleAddModel = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      framework: e.target.framework.value,
      useCase: e.target.useCase.value,
      dataset: e.target.dataset.value,
      description: e.target.description.value,
      image: e.target.image.value,
      createdBy: user?.email || "Unknown User",
      createdAt: new Date().toISOString(),
      purchased: 0,
      purchasedBy: user?.email,
    };

    fetch("http://localhost:3000/models", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Model added successfully!", {
          position: "top-center",
        });
        console.log(data);
        navigate("/all-models");
      })
      .catch((err) => {
        toast.error(`❌ Failed to add model: ${err.message}`, {
          position: "top-center",
          theme: "colored",
        });
      })
      .finally(() => setLoading(false));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <ScaleLoader color="#00FF00"></ScaleLoader>
      </div>
    );
  }
  return (
    <div className="relative w-full flex justify-center py-10 min-h-screen">
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/m5mhtYbX/ad.jpg')] bg-cover bg-center bg-no-repeat bg-fixed"></div>

      {/* Light overlay / gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdfa]/40 to-[#e6fffa]/40 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl p-10 border border-teal-200/40"
        >
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-[#0f7c76] to-[#0d3c3b] text-transparent bg-clip-text mb-10">
            Add New Model
          </h2>

          <form onSubmit={handleAddModel} className="space-y-6">
            {/* Model Name */}
            <div>
              <label className="block mb-1 font-semibold text-[#0d3c3b]">
                Model Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-3 rounded-xl bg-white/80 border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Enter model name"
              />
            </div>

            {/* Framework & Use Case */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-[#0d3c3b]">
                  Framework
                </label>
                <input
                  type="text"
                  name="framework"
                  className="w-full p-3 rounded-xl bg-white/80 border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="Enter framework"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-[#0d3c3b]">
                  Use Case
                </label>
                <input
                  type="text"
                  name="useCase"
                  className="w-full p-3 rounded-xl bg-white/80 border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="Enter use case"
                />
              </div>
            </div>

            {/* Dataset */}
            <div>
              <label className="block mb-1 font-semibold text-[#0d3c3b]">
                Dataset
              </label>
              <input
                type="text"
                name="dataset"
                className="w-full p-3 rounded-xl bg-white/80 border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Enter dataset name"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-1 font-semibold text-[#0d3c3b]">
                Model Image URL
              </label>
              <input
                type="text"
                name="image"
                className="w-full p-3 rounded-xl bg-white/80 border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Paste image URL"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-semibold text-[#0d3c3b]">
                Description
              </label>
              <textarea
                name="description"
                className="w-full p-3 rounded-xl min-h-[180px] border border-teal-300 
  bg-white/80 text-[#0d3c3b] placeholder:text-gray-500
  focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
                placeholder="Write a detailed description..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-10 py-3 bg-gradient-to-r from-[#0f7c76] to-[#0d3c3b] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Save Model
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddModel;
