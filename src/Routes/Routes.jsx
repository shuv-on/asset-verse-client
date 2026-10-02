import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "../pages/Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const JoinEmployee = lazy(() => import("../pages/Register/JoinEmployee"));
const JoinHR = lazy(() => import("../pages/Register/JoinHR"));
const AssetList = lazy(() => import("../pages/HR/AssetList"));
const AddAsset = lazy(() => import("../pages/HR/AddAsset"));
const UpdateAsset = lazy(() => import("../pages/HR/UpdateAsset"));
const RequestAsset = lazy(() => import("../pages/Employee/RequestAsset"));
const AllRequests = lazy(() => import("../pages/HR/AllRequests"));
const MyAssets = lazy(() => import("../pages/Employee/MyAsset"));
const MyEmployeeList = lazy(() => import("../pages/HR/MyEmployeeList"));
const Subscription = lazy(() => import("../pages/HR/Subscription"));
const Payment = lazy(() => import("../pages/HR/Payment"));
const Profile = lazy(() => import("../components/Profile/Profile"));
const MyTeam = lazy(() => import("../pages/Employee/MyTeam"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
          <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><span className="loading loading-spinner loading-lg text-sky-600"></span></div>}>
            <Root />
          </Suspense>
        ),
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