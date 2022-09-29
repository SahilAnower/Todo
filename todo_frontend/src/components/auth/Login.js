import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../custom_hooks/useAuth";
import styles from "./reglogin.module.css";
import Button from "../utils/Button";
import ForgetPassword from "./ForgetPassword";

function Login({ toggleHandler }) {
  const [isForgetPassword, changeIsForgetPassword] = useState(false);

  const changeForgetPassword = () => {
    changeIsForgetPassword(!isForgetPassword);
  };

  const { verifyAuth, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://todo-mern-daily-app.herokuapp.com/login", user);
      await verifyAuth();
      navigate("/");
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      verifyAuth();
      toast.error("Login Failed");
    }
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <>
      {isForgetPassword ? (
        <ForgetPassword changeForgetPassword={changeForgetPassword} />
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={login} className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              Email
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={inputHandler}
                value={user.email}
                required
              />
            </label>
            <label htmlFor="password" className={styles.label}>
              Password
              <input
                type="password"
                name="password"
                onChange={inputHandler}
                value={user.password}
                placeholder="password"
                required
              />
            </label>
            <Button type="submit" text="Login" />
            <Button
              type="button"
              text="Forgot Password?"
              onClick={() => changeForgetPassword()}
            />
            <Button
              type="button"
              text="🔀Need an Account? SignUp!"
              onClick={() => toggleHandler()}
            />
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
