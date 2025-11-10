import React, { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import MyContainer from "../../Components/MyContainer/MyContainer";
import { ScaleLoader } from "react-spinners";
import MyPurchaseCard from "../MyPurchaseCard/MyPurchaseCard";

const MyPurchase = () => {
  const { user } = use(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch purchases for logged-in user
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`http://localhost:3000/purchase?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`❌ Failed to load purchases: ${err.message}`);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ScaleLoader color="#00FF00" />
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <MyContainer>
        <h2 className="text-2xl font-semibold mb-4">My Purchases</h2>
        <p>No purchases yet.</p>
      </MyContainer>
    );
  }

  return (
    <MyContainer>
      <h2 className="font-bold text-4xl md:text-5xl text-center pt-10 pb-5 text-[#0d3c3b]">
        My<span className="text-[#0f7c76]">Purchase</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {purchases.map((purchase) => (
          <MyPurchaseCard key={purchase._id} purchase={purchase} />
        ))}
      </div>
    </MyContainer>
  );
};

export default MyPurchase;
