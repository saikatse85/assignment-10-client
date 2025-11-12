import React, { useEffect, useState } from "react";
import MyContainer from "../../Components/MyContainer/MyContainer";
import { ScaleLoader } from "react-spinners";
import SuperSlider from "../../Components/SuperSlider/SuperSlider";
import ModelCard from "../../Components/ModelCard/ModelCard";
import AboutAiModels from "../../Components/AboutAiModels/AboutAiModels";
import GetStarted from "../../Components/GetStarted/GetStarted";
import { toast } from "react-toastify/unstyled";

const Home = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://ai-model-server-rosy.vercel.app/latest-models")
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setModels(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
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
    <div className="bg-gray-50">
      <div className="bg-gray-50 p-6">
        <MyContainer>
          <SuperSlider />
        </MyContainer>
      </div>
      <MyContainer>
        <h1 className="font-bold text-4xl md:text-5xl text-center pt-10 pb-5 text-[#0d3c3b]">
          Latest <span className="text-[#0f7c76]">Models</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-5">
          {models.map((model) => (
            <ModelCard key={model._id} model={model}></ModelCard>
          ))}
        </div>
        <AboutAiModels></AboutAiModels>
        <GetStarted></GetStarted>
      </MyContainer>
    </div>
  );
};

export default Home;
