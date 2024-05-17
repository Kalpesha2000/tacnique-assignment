import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { routes } from "./Routes/Routes";

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <RouterProvider router={routes} />
      </Suspense>
    </>
  );
}

export default App;
