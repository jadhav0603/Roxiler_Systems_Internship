import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ContextAPI } from "./ContextAPI";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css files/passwordUpdateForm.css";

const PasswordUpdateForm = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { userName, id } = useContext(ContextAPI);
  const navigate = useNavigate();

  const handleChangePassForm = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      alert("New password and confirm password do not match.");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("token");

    try {
      const response = await axios.patch(
        "http://localhost:3000/user/changePassword",
        { id, oldPass, newPass },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      localStorage.removeItem("token");
      navigate("/loginModel");
    } catch (error) {
      console.log({ change_pass_error: error.response?.data || error.message });
    }
  };

  return (
    <div className="password-update-container">
      <div className="user-info">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
        <h1 className="user-name">{userName}</h1>
      </div>

      <form onSubmit={handleChangePassForm} className="password-form">
        <input
          type="text"
          placeholder="Old Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          className="password-input"
        />
        <input
          type="text"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="password-input"
        />
        <input
          type="text"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          className="password-input"
        />
        <button type="submit" className="password-submit-button">
          UPDATE PASSWORD
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdateForm;
