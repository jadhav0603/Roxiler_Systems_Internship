import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ContextAPI } from "./ContextAPI";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordUpdateForm = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { userName, id } = useContext(ContextAPI);

  const navigate = useNavigate()
  
  const handleChangePassForm = async (e) => {
  e.preventDefault();

  if (newPass !== confirmPass) {
    alert("New password and confirm password do not match.");
    return;
  }

  const token=localStorage.getItem('token')
  console.log('token')

  try {
    const response = await axios.patch('http://localhost:3000/user/changePassword', {
      id, oldPass, newPass},{
       headers:{
                    Authorization: `Bearer ${token}`
                }
    });

    console.log(response.data);

    localStorage.removeItem('token');
    navigate('/loginModel');
  } catch (error) {
    console.log({ change_pass_error:error.response?.data || error.message });
  }
};


  return (
    <div>
        <div style={{border:"grey" ,borderRadius:"50%", display:"flex", justifyContent:"center"}}>
      <FontAwesomeIcon icon={faUser} />
      <h1>{userName}</h1>
        </div>

      <form onSubmit={handleChangePassForm}>
        
        <input
          type="text"
          placeholder="Old Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />

        <input
          type="text"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <input
          type="text"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button type="submit"> UPDATE PASSWORD </button>
      </form>
    </div>
  );
};

export default PasswordUpdateForm;
