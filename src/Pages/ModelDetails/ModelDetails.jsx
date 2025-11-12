import React, { useEffect, useState, use } from "react";
import { useNavigate, useParams } from "react-router";
import { ScaleLoader } from "react-spinners";
import ModelDetailsCard from "../../Components/ModelDetailsCard/ModelDetailsCard";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ModelDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load ModelDetails
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/models/${id}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModel(data.result || data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  // Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/models/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            navigate("/all-models");
            // Optional: UI update code here, like removing the deleted model from state
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
          });
      }
    });
  };

  const handlePurchase = () => {
    fetch(`http://localhost:3000/purchase`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        modelId: model._id,
        name: model.name,
        image: model.image,
        email: user.email,
        purchasedBy: user.email,
        purchasedAt: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Successfully Purchased");
      });
    setModel((prev) => ({
      ...prev,
      purchased: prev.purchased + 1,
    })).catch((err) => {
      console.log(err.message);
    });
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
