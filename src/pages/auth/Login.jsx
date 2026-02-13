import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { LuCircleUser } from 'react-icons/lu';
import { MdEmail } from 'react-icons/md';
import { TbLockPassword } from 'react-icons/tb';
import { Link } from 'react-router';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {signinUser,signInGoogle}=useAuth()
    const handleLogin = (data) => {
        console.log('after login', data)
        signinUser(data.email, data.password)
       
    }
    const handleGoogleSignin=()=>{
         signInGoogle()
        .then(result=>{
            console.log(result.user)
        })
        .catch(errors=>{
            console.log(errors)
        })
    }
    const handleTogglePasswordShow = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }
    return (
        <div className='flex justify-center '>
            <StyledWrapper>
                <form onSubmit={handleSubmit(handleLogin)} className="form">

                    <div className="flex-column">
                        <label>Email </label></div>
                    <div className="inputForm">
                        <MdEmail></MdEmail>
                        <input type="text" {...register('email',{ required: true })} className="input" placeholder="Enter your Email" />
                    </div>
                        {
                            errors.email?.type === "required" &&
                            <p className='text-[14px] font-semibold text-red-600'>Email is required</p>
                        }
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <TbLockPassword size={20} />
                        <input type={showPassword ? 'text' : 'password'} {...register('password',{ required: true })}
                            className="input" placeholder="Enter your Password" />
                        <span className='cursor-pointer' onClick={handleTogglePasswordShow}>{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                    </div>
                    {
                            errors.password?.type === "required" &&
                            <p className='text-[14px] font-semibold text-red-600'>Password is required</p>
                        }
                    <div className="flex-row">
                        <div>
                            <input type="checkbox" />
                            <label>Remember me </label>
                        </div>
                        <span className="span">Forgot password?</span>
                    </div>
                    <button className="button-submit">Sign In</button>
                    <p className="p">Don't have an account? <Link to={'/register'} className="span">Sign in</Link>
                    </p><p className="p line">Or With</p>
                    <div className="">
                        <SocialLogin></SocialLogin>

                    </div></form>
            </StyledWrapper>
        </div>
    );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
    ;
  }`;
export default Register;