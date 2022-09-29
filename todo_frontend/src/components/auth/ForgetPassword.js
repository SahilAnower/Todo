import React, { useState } from "react";
import styles from "./reglogin.module.css";
import Button from "../utils/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword({ changeForgetPassword }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    otpCode: "",
    password: "",
  });
  const [validateOtp, changeValidateOtp] = useState(false);
  const [changedPassword, isChangedPassword] = useState(false);

//   function for handling the user states of email otp and password
  const inputHandler = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
//   function for sending OTP to mail
  const sendEmail = async (e) => {
    e.preventDefault();
    let res = null;
    try {
      res = await axios.post("http://localhost:8000/email_send", {
        email: user.email,
      });
      if (res.data.statusText === "Success") {
        toast.success(res.data.message);
        changeValidateOtp(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
//   function for validating whether it's the right OTP or not
  const validateOtpFun = async (e) => {
    e.preventDefault();
    let res = null;
    try {
      res = await axios.post("http://localhost:8000/validate_otp", {
        email: user.email,
        otpCode: user.otpCode,
      });
      if (res.data.statusText === "Success") {
        toast.success(res.data.message);
        isChangedPassword(true);
        changeValidateOtp(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
//   function for setting in the new password
  const passwordHandler = async (e) => {
    e.preventDefault();
    let res = null;
    try {
      res = await axios.post("http://localhost:8000/change_password", {
        email: user.email,
        password: user.password,
      });
      if (res.data.statusText === "Success") {
        toast.success(res.data.message);
        setUser({
          email: "",
          password: "",
        });
        await changeForgetPassword();
        isChangedPassword(false);
        navigate("/auth");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={
          validateOtp
            ? validateOtpFun
            : changedPassword
            ? passwordHandler
            : sendEmail
        }
        className={styles.form}
      >
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
        {!validateOtp && !changedPassword && (
          <Button type="submit" text="Send OTP to Email" />
        )}
        {validateOtp && (
          <>
            <label htmlFor="otpCode" className={styles.label}>
              OTP
              <input
                type="otpCode"
                name="otpCode"
                placeholder="otpCode"
                onChange={inputHandler}
                value={user.otpCode}
                required
              />
            </label>
            <Button type="submit" text="Validate OTP" />
          </>
        )}
        {changedPassword && (
          <>
            <label htmlFor="password" className={styles.label}>
              OTP
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={inputHandler}
                value={user.password}
                required
              />
            </label>
            <Button type="submit" text="New Password" />
          </>
        )}
      </form>
      <Button
        type="button"
        text="◀Login"
        onClick={() => changeForgetPassword()}
      />
    </div>
  );
}

export default ForgetPassword;
