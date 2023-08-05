import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

import PageHeader from '../page-header/PageHeader';
import logo from '../../assets/main-logo.png';
import './Signup.scss';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setUsername] = useState("");
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(); 
    const [usernameError,setUsernameError] = useState();
    const [nameError,setNameError] = useState();
    const [emailError,setEmailError] = useState();
    const [passwordError,setPasswordError] = useState();
    const [confirmpasswordError,setConfirmPasswordError] = useState();

    const user = {
        name,
        fullname,
        email,
        password,
        confirmPassword,
    }
    const registerHandler = () => {
        axios.post("http://localhost:8000/api/users/register",user).then(res=>navigate('/login'))
        .catch(err=>console.log(err))
    }
    return (
        <div onClick={()=>{setUsernameError();setNameError();setEmailError();setPasswordError()}}>
            <PageHeader>
                Register
            </PageHeader>

            <div className='signup-page'>
                <div className='signup-left'>
                        <div className='logo'>
                            <img src={logo} alt='MyMovies' />
                            <Link to='/'>MoviesHub</Link>
                        </div><br></br>
                        <h3>The best Movie Database App for you</h3>
                        <p>Please register to start using our service.</p>
                </div>
                <div  className='signup-right'>
                    <div className='signup-right-gradient'>
                        <div className='register-container'>
                            <h1>Register</h1>
                            <label>Username:</label>
                            <input className='inputforms' type='text' onChange={(e) => { setUsername(e.target.value);
                              if(e?.target?.value?.length < 4) {
                                setUsernameError("*Username must be at least 4 characters long")
                             }else{
                                setUsernameError()
                             }
                            }} placeholder="Enter your username" />
                            <p style={{color:"red",fontSize:"14px"}}>{usernameError}</p>
                            <label>Name:</label>
                            <input className='inputforms' type='text' onChange={(e) => { setFullName(e.target.value);
                              if(e?.target?.value?.length < 6) {
                                setNameError("*Full Name must be at least 6 characters long")
                             }else{
                                setNameError()
                             } }} placeholder="Enter your full name" />
                             <p style={{color:"red",fontSize:"14px"}}>{nameError}</p>
                            <label>Email:</label>
                            <input className='inputforms' type='email' onChange={(e) => { setEmail(e.target.value);
                              if(e?.target?.value?.length < 6) {
                                setEmailError("*Email must be at least 6 characters long")
                             }else{
                                setEmailError()
                             } }} placeholder="Enter your email" />
                             <p style={{color:"red",fontSize:"14px"}}>{emailError}</p>
                            <label>Password:</label>
                            <input className='inputforms' type='password' onChange={(e) => { setPassword(e.target.value);
                              if(e?.target?.value?.length < 8) {
                                setPasswordError("*Password must be at least 8 characters long")
                             }else{
                                setPasswordError()
                             } }} placeholder="Enter your password" />
                             <p style={{color:"red",fontSize:"14px"}}>{passwordError}</p>
                            <label>Confirm Password:</label>
                            <input className='inputforms' type='password' onChange={(e) => { setConfirmPassword(e.target.value);
                            if(e.target.value !== password){
                                setConfirmPasswordError("Doesn't match the password")
                            }else{
                                setConfirmPasswordError()
                            }
                             }} placeholder="Confirm your password" />
                             <p style={{color:"red",fontSize:"14px"}}>{confirmpasswordError}</p>
                            <p>Do you already have an account?<a className='rg-here' href='/login'>Login here</a>.</p>
                            {name?.length<4 || fullname?.length<6 || email?.length<6 || password?.length<8 || password !==confirmPassword ? null : <button onClick={registerHandler} class="register-btn">Signup</button> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
