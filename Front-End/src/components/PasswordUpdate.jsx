import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import '../css files/PasswordUpdate.css'; // Import your CSS file

const PasswordUpdate = () => {
  const navigate = useNavigate();

  const handleUpdatePassword = () => {
    navigate('/passwordUpdateForm');
  }

  return (
    <div className="password-update-container">
      <FontAwesomeIcon icon={faUser} className="password-update-icon" />
      <button type="button" onClick={handleUpdatePassword} className="update-password-btn">
        Update Password
      </button>
    </div>
  );
}

export default PasswordUpdate;
