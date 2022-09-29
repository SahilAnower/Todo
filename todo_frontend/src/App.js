import React, { Component } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import Auth from "./components/Auth";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.8rem",
          },
        }}
      />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
