import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const PasswordUpdate = () => {
    const navigate = useNavigate();

    const handleUpdatePassword = async()=>{
        navigate('/passwordUpdateForm')
    }

  return (
    <div>
      <FontAwesomeIcon icon={faUser} />
      <button type="button" onClick={()=>handleUpdatePassword()}>Update Password</button>
      </div>
  )
}

export default PasswordUpdate