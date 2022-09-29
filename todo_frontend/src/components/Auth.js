import React, { useEffect, useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from "./Layout";
import useAuth from "../custom_hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isRegister, setIsRegister] = useState(true);

  const toggleHandler = () => {
    setIsRegister(!isRegister);
  };

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate("/");
  }, [auth, navigate]);

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px" }}>
        Welcome to My To-do App 📝
      </h1>
      <Layout>
        {isRegister ? (
          <Register toggleHandler={toggleHandler} />
        ) : (
          <Login toggleHandler={toggleHandler} />
        )}
      </Layout>
    </>
  );
}

export default Auth;
