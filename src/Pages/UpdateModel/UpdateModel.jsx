import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";

const UpdateModel = () => {
  const { id } = useParams();
  const [model, setModel] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://ai-model-server-rosy.vercel.app/models/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleUpdateModel = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name?.value,
      framework: e.target.framework?.value,
      useCase: e.target.useCase?.value,
      dataset: e.target.dataset?.value,
      description: e.target.description?.value,
      image: e.target.image?.value,
    };

    setLoading(true);

    fetch(`https://ai-model-server-rosy.vercel.app/models/${model._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Model Update successfully!");
        console.log(data.result);
        navigate(`/model-details/${id}`);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`❌ Failed to Update model: ${err.message}`, {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <ScaleLoader color="#00FF00"></ScaleLoader>
      </div>
    );
  }
  return (
    <div>
      <div className="w-full flex justify-center py-10 min-h-screen bg-[url('https://i.ibb.co.com/hkt9xHb/update.jpg')] bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl backdrop-blur-2xl  shadow-2xl rounded-3xl p-10 border "
        >
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-[#0f7c76] to-[#0d3c3b] text-transparent bg-clip-text mb-10 ">
            Update Model
          </h2>

          <form onSubmit={handleUpdateModel} className="space-y-6">
            {/* Model Name */}
            <div>
              <label className="block mb-1 font-semibold text-white">
                Model Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={model.name}
                className="w-full p-3 text-gray-300 rounded-xl border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Enter model name"
              />
            </div>

            {/* Framework & Use Case */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-white">
                  Framework
                </label>
                <input
                  type="text"
                  name="framework"
                  defaultValue={model.framework}
                  className="w-full p-3 text-gray-300 rounded-xl border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="Enter framework"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-white">
                  Use Case
                </label>
                <input
                  type="text"
                  name="useCase"
                  defaultValue={model.useCase}
                  className="w-full p-3 text-gray-300 rounded-xl border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="Enter use case"
                />
              </div>
            </div>

            {/* Dataset */}
            <div>
              <label className="block mb-1 font-semibold text-white">
                Dataset
              </label>
              <input
                type="text"
                name="dataset"
                defaultValue={model.dataset}
                className="w-full p-3 text-gray-300 rounded-xl border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Enter dataset name"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-1 font-semibold text-white">
                Model Image URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue={model.image}
                className="w-full p-3 text-gray-300 rounded-xl border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Paste image URL"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-semibold text-white">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={model.description}
                className="w-full p-3 text-gray-300 rounded-xl min-h-[180px] border border-teal-300 focus:ring-2 focus:ring-teal-500 outline-none"
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

export default UpdateModel;
