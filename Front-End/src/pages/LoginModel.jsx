import React, { useContext } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import '../css files/login.css';
import { ContextAPI } from '../components/ContextAPI';

const LoginModel = () => {
  const {isLogin, setIsLogin} = useContext(ContextAPI)

  return (
    <div className="auth-container">
      <div className="auth-header">
        <button
          className={isLogin ? 'auth-tab active' : 'auth-tab'}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? 'auth-tab active' : 'auth-tab'}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <div className="auth-form-container">
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default LoginModel;
