import React, { useState } from 'react';
import './AITheme.css';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  var navigate = useNavigate()
   var [formData, setFormData] = useState({
    
      email: '',
      password: ''
    });
   var handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  var handleSubmit = (e) => {
    e.preventDefault();
    var email = e.target.email.value;
    var password = e.target.password.value
    var obj ={
      email,password
    }
    fetch("http://localhost:5000/login",{
        method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
    }).then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token)
      alert(data.message);
      navigate('/');

    } else {
      alert(data.message)
    }
  })
  .catch(err => console.log('something went wrong', err))
  };

  return (
    <div className="ai-auth-container">
  
      <div className="neural-glow">
        <div className="glow-node node-left"></div>
        <div className="glow-node node-right"></div>
      </div>
      
      <form className="ai-auth-card" onSubmit={handleSubmit}>
        <div className="ai-auth-header">
          <div className="ai-logo-mark">
            <div className="core-pulse"></div>
          </div>
          <h2>Initialize Session</h2>
          <p>Connect to your private AI companion environment.</p>
        </div>

        <div className="ai-input-group">
          <label>Identity / Email</label>
          <input 
            type="email" 
            placeholder="identity@network.com" 
           name='email'
           onChange={handleChange}
            required 
          />
        </div>

        <div className="ai-input-group">
          <label>Access Key</label>
          <input 
            type="password" 
            placeholder="••••••••" 
           name='password'
            onChange={handleChange}
            required 
          />
        </div>

        <div className="ai-auth-utilities">
          <label className="ai-checkbox-label">
            <input type="checkbox" /> Remember context
          </label>
          <a href="#reset" className="ai-link">Recover Key</a>
        </div>

        <button type="submit" className="ai-submit-btn">Launch Workspace</button>

        <p className="ai-switch-mode">
          New user? <Link to="/register" className="ai-link">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;