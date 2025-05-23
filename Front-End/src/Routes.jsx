import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/Login";
import Register from "./components/Register";
import App from './App';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    )
}

export default AppRouter