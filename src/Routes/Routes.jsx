import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "../pages/Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import JoinEmployee from "../pages/Register/JoinEmployee";
import JoinHR from "../pages/Register/JoinHR";

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
        ],
    },
]);