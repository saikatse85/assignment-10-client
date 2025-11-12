import React, { useEffect, useState } from "react";
import ModelCard from "../../Components/ModelCard/ModelCard";
import MyContainer from "../../Components/MyContainer/MyContainer";
import { ScaleLoader } from "react-spinners";

const ViewAllModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all models initially
  useEffect(() => {
    setLoading(true);
    fetch("https://ai-model-server-rosy.vercel.app/models")
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // SEARCH (unchanged)
  const handleSearch = (e) => {
    e.preventDefault();
    const text_search = e.target.name?.value;

    fetch(
      `https://ai-model-server-rosy.vercel.app/search?search=${text_search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
      });
  };

  // FILTER (fixed version)
  const handleFilter = (e) => {
    const framework = e.target.value;

    fetch(
      `https://ai-model-server-rosy.vercel.app/filter?framework=${framework}`
    )
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto h-[50vh]">
        <ScaleLoader />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-4xl md:text-5xl text-center pt-10 pb-5 text-[#0d3c3b]">
        All <span className="text-[#0f7c76]">Models</span>
      </h1>

      {/* Search + Filter */}
      <MyContainer>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="w-full md:w-1/3 flex items-center justify-center"
          >
            <input
              type="text"
              name="name"
              placeholder="Search models by name..."
              className="input flex-1 input-bordered border-teal-600/40"
            />
            <button className="px-4 py-2 bg-[#0f7c76] text-white rounded-lg hover:bg-[#0d3c3b] transition">
              Search
            </button>
          </form>

          {/* Framework Filter */}
          <select
            className="select select-bordered w-full md:w-1/3 border-teal-600/40"
            onChange={handleFilter}
          >
            <option>All</option>
            <option>TensorFlow</option>
            <option>PyTorch</option>
            <option>Keras</option>
            <option>Scikit-Learn</option>
          </select>
        </div>
      </MyContainer>

      {/* Models Grid */}
      <MyContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-5">
        {models.length > 0 ? (
          models.map((model) => <ModelCard key={model._id} model={model} />)
        ) : (
          <p className="text-center text-lg text-gray-500 col-span-3">
            No models found.
          </p>
        )}
      </MyContainer>
    </div>
  );
};

export default ViewAllModels;
