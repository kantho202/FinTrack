import React from 'react';
import Login from '../pages/auth/Login';
import Navbar from '../pages/shares/Navbar';
import { Outlet } from 'react-router';
import Logo from '../components/Logo/Logo';

const AuthLayout = () => {
    return (
        <div className='min-h-screen'>
            <div className='text-center p-5'>
                <Logo></Logo>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;