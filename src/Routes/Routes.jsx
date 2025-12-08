import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "../pages/Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import JoinEmployee from "../pages/Register/JoinEmployee";
import JoinHR from "../pages/Register/JoinHR";
import AssetList from "../pages/HR/AssetList";
import PrivateRoute from "./PrivateRoute";
import AddAsset from "../pages/HR/AddAsset";
import UpdateAsset from "../pages/HR/UpdateAsset";
import RequestAsset from "../pages/Employee/RequestAsset";
import AllRequests from "../pages/HR/AllRequests";
import MyAssets from "../pages/Employee/MyAsset";
import MyEmployeeList from "../pages/HR/MyEmployeeList";
import Subscription from "../pages/HR/Subscription";
import Payment from "../pages/HR/Payment";
import Profile from "../components/Profile/Profile";
import MyTeam from "../pages/Employee/MyTeam";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/join-employee",
              element: <JoinEmployee />,
            },
            {
              path: "/join-hr",
              element: <JoinHR />,
            },
            {
              path: "/asset-list",
              element: <PrivateRoute><AssetList /></PrivateRoute>,
            },
            {
              path: "/add-asset",
              element: <PrivateRoute><AddAsset/></PrivateRoute>
            },
            {
              path: "/update-asset/:id",
              element: <PrivateRoute><UpdateAsset/></PrivateRoute>
            },
            {
              path: "/request-asset",
              element: <PrivateRoute><RequestAsset/></PrivateRoute>
            },
            {
              path: "/all-requests",
              element: <PrivateRoute><AllRequests/></PrivateRoute>
            },
            {
              path: "/my-assets",
              element: <PrivateRoute><MyAssets/></PrivateRoute>
            },
            {
              path: "/my-employee-list",
              element: <PrivateRoute><MyEmployeeList/></PrivateRoute>
            },
            {
              path: "/subscription",
              element: <PrivateRoute><Subscription/></PrivateRoute>
            },
            {
              path: "/payment",
              element: <PrivateRoute><Payment/></PrivateRoute>
            },
            {
              path: "/profile",
              element: <PrivateRoute><Profile/></PrivateRoute>
            },
            {
              path: "/my-team",
              element: <PrivateRoute><MyTeam/></PrivateRoute>
            },
            

        ],
    },
]);