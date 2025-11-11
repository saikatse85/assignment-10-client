import { createBrowserRouter } from "react-router";
import MainLayouts from "../LayOuts/MainLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ViewAllModels from "../Pages/ViewAllModels/ViewAllModels";
import PrivateRout from "./PrivateRout/PrivateRout";
import ModelDetails from "../Pages/ModelDetails/ModelDetails";
import AddModel from "../Pages/AddModel/AddModel";
import UpdateModel from "../Pages/UpdateModel/UpdateModel";
import MyModels from "../Pages/MyModels/MyModels";
import MyPurchase from "../Pages/MyPurchase/MyPurchase";
import Error from "../Pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/all-models",
        Component: ViewAllModels,
      },
      {
        path: "/model-details/:id",
        element: (
          <PrivateRout>
            <ModelDetails></ModelDetails>
          </PrivateRout>
        ),
      },
      {
        path: "/add-models",
        element: (
          <PrivateRout>
            <AddModel></AddModel>
          </PrivateRout>
        ),
      },
      {
        path: "/update-model/:id",
        element: (
          <PrivateRout>
            <UpdateModel></UpdateModel>
          </PrivateRout>
        ),
      },
      {
        path: "/purchase",
        element: (
          <PrivateRout>
            <MyPurchase></MyPurchase>
          </PrivateRout>
        ),
      },
      {
        path: "/my-models",
        element: (
          <PrivateRout>
            <MyModels></MyModels>
          </PrivateRout>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <Error></Error>,
  },
]);
export default router;
