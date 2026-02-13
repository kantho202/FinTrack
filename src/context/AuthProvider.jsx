import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signinUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email, password)
    }
    const signInGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const authInfo = {
        user,
        loading,
        registerUser,
        signinUser,
        signInGoogle
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;