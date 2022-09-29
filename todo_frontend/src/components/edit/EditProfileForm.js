import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../utils/Button";
import styles from "./EditProfile.module.css";

function EditProfileForm() {
  let iconStyles = {
    fontSize: "1.5rem",
  };

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
  };

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://todo-mern-daily-app.herokuapp.com/user"
        );
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const updateUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://todo-mern-daily-app.herokuapp.com/user",
        user
      );
      toast.success("Profile Updated Successfully");
      setUser(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link to="/" style={linkStyle}>
        <div className={styles.back}>
          <BsArrowLeftShort style={iconStyles} />
          Home
        </div>
      </Link>
      <div>
        <h1>Edit Profile</h1>
        <form onSubmit={updateProfile} className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            Full Name
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={user.name}
              onChange={updateUserInfo}
            />
          </label>
          <label htmlFor="email" className={styles.label}>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={updateUserInfo}
            />
          </label>
          <Button type="submit" text="Save" />
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
