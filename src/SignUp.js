import React, { useState } from 'react';
import './SignUpForm.css'; // Import CSS file for styling
import { User } from "./Classes/entity_class.tsx";
import {API} from "./api.tsx";
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {

  const navigate = useNavigate();
  const handleClick = () =>{
    
    API.addUser(user).then((r)=>{
      console.log(r);
    });
    console.log("Sign Up clicked")
    navigate("/")
  } 

  const [user, setUser] = useState("");
/*
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(user);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={user.username} onChange={(e)=>{
            setUser({...user,username:e.target.value})
          }} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={(e)=>{
            setUser({...user,password:e.target.value})
           }} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={(e)=>{
            setUser({...user,email:e.target.value})
           }} required />
        </div>
        <button type="submit" onClick={handleClick}>Sign Up</button>
      </form>
    </div>
  );
};



export default SignUpForm;
