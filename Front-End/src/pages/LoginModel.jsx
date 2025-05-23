import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import '../login.css'

const LoginModel = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button
          style={isLogin ? styles.activeButton : styles.inactiveButton}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          style={!isLogin ? styles.activeButton : styles.inactiveButton}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <div style={styles.formContainer}>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  activeButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  inactiveButton: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  formContainer: {
    padding: '10px',
  },
};

export default LoginModel;
