import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { toast } from "react-toastify";
import ModelCard from "../../Components/ModelCard/ModelCard";
import { ScaleLoader } from "react-spinners";
import MyContainer from "../../Components/MyContainer/MyContainer";
import MyModelCard from "../MyModelCard/MyModelCard";

const MyModels = () => {
  const { user } = use(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-models?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`❌ Failed to add model: ${err.message}`, {
          position: "top-center",
          theme: "colored",
        });
      })
      .finally(() => setLoading(false));
  }, [user, user.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <ScaleLoader color="#00FF00" />
      </div>
    );
  }
  return (
    <div className="py-5">
      <MyContainer>
        <h1 className="font-bold text-4xl md:text-5xl text-center py-10 text-[#0d3c3b]">
          My <span className="text-[#0f7c76]">Models</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {models.map((model) => (
            <MyModelCard key={model._id} model={model}></MyModelCard>
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default MyModels;
