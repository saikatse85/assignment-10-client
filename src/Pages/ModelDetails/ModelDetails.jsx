import React, { useEffect, useState, use } from "react";
import { useParams } from "react-router";
import { ScaleLoader } from "react-spinners";
import ModelDetailsCard from "../../Components/ModelDetailsCard/ModelDetailsCard";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";

const ModelDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);

  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(false);

  // Load Single Model
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/models/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data.result);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  // Delete
  const handleDelete = (id) => {
    console.log("delete", id);
  };

  // Purchase Handler
  const handlePurchase = async (model) => {
    try {
      // 1) Save purchase to purchase collection
      await fetch("http://localhost:3000/purchase", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          modelId: model._id,
          name: model.name,
          image: model.image,
          email: user.email,
          buyerEmail: user.email,
          purchasedAt: new Date(),
        }),
      });

      // 2) Purchased count increase in main models collection
      const updated = await fetch(`http://localhost:3000/models/${model._id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          purchased: model.purchased + 1, // Increase count
        }),
      }).then((res) => res.json());

      // Update UI real-time
      setModel(updated);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <ScaleLoader color="#00FF00" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-4xl md:text-5xl text-center pt-10 pb-5 text-[#0d3c3b]">
        Model <span className="text-[#0f7c76]">Details</span>
      </h2>

      {model && (
        <ModelDetailsCard
          key={model._id}
          model={model}
          user={user}
          handleDelete={handleDelete}
          handlePurchase={handlePurchase}
        />
      )}
    </div>
  );
};

export default ModelDetails;
