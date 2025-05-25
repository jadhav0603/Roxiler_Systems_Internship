import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { ContextAPIprovider } from './components/ContextAPI';


import App from './App';
import LoginModel from './pages/LoginModel';
import PasswordUpdateForm from './components/PasswordUpdateForm';
import AdminDashboard from './pages/AdminDashboard';
import StoreDashboard from './pages/StoreDashboard';
import UserDashboard from './pages/UserDashboard';


const AppRouter = () => {
    return (
        <ContextAPIprovider>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/loginModel' element={<LoginModel />} />
                <Route path='/passwordUpdateForm' element={<PasswordUpdateForm />} />
                <Route path='/adminDashboard' element={<AdminDashboard />} />
                <Route path='/storeDashboard' element={<StoreDashboard />} />
                <Route path='/userDashboard' element={<UserDashboard />} />
            </Routes>
        </ContextAPIprovider>
       
    )
}

export default AppRouter