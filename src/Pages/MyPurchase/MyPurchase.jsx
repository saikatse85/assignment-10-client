import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import MyContainer from "../../Components/MyContainer/MyContainer";
import { ScaleLoader } from "react-spinners";
import MyPurchaseCard from "../MyPurchaseCard/MyPurchaseCard";

const MyPurchase = () => {
  const { user } = useContext(AuthContext); // Corrected
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch purchases for logged-in user
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    // Step 1: fetch purchases
    fetch(`http://localhost:3000/purchase?email=${user.email}`)
      .then((res) => res.json())
      .then(async (purchaseData) => {
        const mergedData = await Promise.all(
          purchaseData.map(async (purchase) => {
            try {
              const res = await fetch(
                `http://localhost:3000/models/${purchase.modelId}`
              );
              const modelData = await res.json();
              return {
                ...modelData.result,
                ...purchase,
              };
            } catch (err) {
              console.error("Failed to fetch model for purchase", err);
              return purchase;
            }
          })
        );

        setPurchases(mergedData);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`❌ Failed to load purchases: ${err.message}`);
        setLoading(false);
      });
  }, [user?.email]);

  // Delete handler
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/purchase/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted successfully");
          setPurchases(purchases.filter((p) => p._id !== id));
        } else {
          toast.error("Failed to delete");
        }
      })
      .catch(() => {
        toast.error("Failed to delete");
      });
  };
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
    <div className="py-5">
      <MyContainer>
        <h2 className="font-bold text-4xl md:text-5xl text-center pt-10 pb-10 text-[#0d3c3b]">
          My <span className="text-[#0f7c76]">Purchase</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {purchases.map((purchase) => (
            <MyPurchaseCard
              key={purchase._id}
              purchase={purchase}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default MyPurchase;
