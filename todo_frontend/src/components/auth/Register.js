import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./reglogin.module.css";
import Button from "../utils/Button";

function Register({ toggleHandler }) {
  const [user, setUser] = useState({
    name: "",
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

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://todo-mern-daily-app.herokuapp.com/register",
        user
      );
      toast.success("Registration Successful");
      toggleHandler();
    } catch (err) {
      console.log(err);
      toast.error("Registration Failed");
    }
    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={register} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Name
          <input
            type="name"
            name="name"
            placeholder="name"
            onChange={inputHandler}
            value={user.name}
            required
          />
        </label>
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
        <Button type="submit" text="Register" />
        <Button
          type="button"
          text="🔀Already Registered? Login!"
          onClick={() => toggleHandler()}
        />
      </form>
    </div>
  );
}

export default Register;
