import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const Index = lazy(() => import("../Dashboard/Index"));
const LogIn = lazy(() => import("../Login/Login"));

// new way
const routes = createBrowserRouter([
  {
    path: "/dashboard",
    exact: true,
    name: "Index",
    element: (
      <ProtectedRoutes>
        <Index />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/",
    exact: true,
    name: "LogIn",
    element: <LogIn />,
    errorElement: <div>ERROR.......!</div>,
  },
]);

export { routes };
