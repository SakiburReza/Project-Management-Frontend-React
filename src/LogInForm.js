import React, { useState } from 'react';
import './LogInForm.css'; // Import CSS file for styling
import SignUpForm from './SignUp';
import {API} from "./api.tsx";
import { useNavigate } from 'react-router-dom';
import { showSnackbar } from './Classes/entity_class.tsx';
import { useSnackbar } from "notistack";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.login(formData.username, formData.password).then((r)=>{
      console.log(r);
      if (r.status == 200 && r.data.success) {
        localStorage.clear();
        API.getUserByUsername(formData.username).then(r=>{
          if(r.data && r.status == 200){
            localStorage.setItem("User",JSON.stringify(r.data));
          }
          
        })
        navigate("/project-page");
      }
      else {
        showSnackbar(enqueueSnackbar, r.data, () => {});
      }
    })
    console.log(formData);
  };

  const handleSignUp = () => {
    // Handle sign up navigation or action
    navigate("/sign-up");
    console.log('Sign Up button clicked');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
        <div>
        <p> Don't have an account?</p>
        <button type="button" className="signup-button" onClick={handleSignUp}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
