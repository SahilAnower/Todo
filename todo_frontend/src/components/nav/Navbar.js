import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../utils/Button";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  let iconStyles = {
    fontSize: "1.5rem",
  };

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
  };

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        "https://todo-mern-daily-app.herokuapp.com/user"
      );
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      const temp = await axios.get(
        "https://todo-mern-daily-app.herokuapp.com/logout"
      );
      setUser(null);
      navigate("/");
      toast.success("User Logged Out Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!user) return null;

  return (
    <header className={styles.header}>
      <div className={styles.userinfo}>
        <div className={styles.user_details}>
          <FaUserAlt style={iconStyles} />
          <div className={styles.user_name}>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
        </div>
        <Link to="/edit-profile" style={linkStyle}>
          <div className={styles.settings}>
            <AiFillSetting style={iconStyles} />
            <span>Settings</span>
          </div>
        </Link>
      </div>
      <nav>
        <Button text="Log Out" onClick={handleLogout} />
      </nav>
    </header>
  );
}

export default Navbar;
