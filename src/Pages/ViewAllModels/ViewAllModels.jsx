import React, { useEffect, useState } from "react";
import ModelCard from "../../Components/ModelCard/ModelCard";
import MyContainer from "../../Components/MyContainer/MyContainer";

const ViewAllModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/models")
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        console.log(data);
        setModels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <ScaleLoader color="#00FF00"></ScaleLoader>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-4xl md:text-5xl text-center pt-10 pb-5 text-[#0d3c3b]">
        All <span className="text-[#0f7c76]">Models</span>
      </h1>
      <MyContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-5">
        {models.map((model) => (
          <ModelCard key={model._id} model={model}></ModelCard>
        ))}
      </MyContainer>
    </div>
  );
};

export default ViewAllModels;
