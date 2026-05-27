import React, { useState } from 'react';
import './AITheme.css';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';


var Register = () => {
  var navigate = useNavigate();
  var [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  var handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

function handleSubmit(e) {
  e.preventDefault();
  var username = e.target.name.value;
  var email = e.target.email.value;
  var password = e.target.password.value;
  var confirmPassword = e.target.confirmPassword.value;
  var obj = {
    username, email, password, confirmPassword
  }

  fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
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
}

  return (
    <div className="ai-auth-container">
      <div className="neural-glow">
        <div className="glow-node node-left"></div>
        <div className="glow-node node-right"></div>
      </div>
      
      <form className="ai-auth-card register-wide" onSubmit={handleSubmit}>
        <div className="ai-auth-header">
          <div className="ai-logo-mark interactive">
            <div className="core-pulse scanning"></div>
          </div>
          <h2>Create Core Profile</h2>
          <p>Register your authorization keys to interact with the LLM pipeline.</p>
        </div>

        <div className="ai-input-group">
          <label>Operator Name</label>
          <input 
            type="text" 
            name="name"
            placeholder="Alex Mercer" 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="ai-input-group">
          <label>Communication Routing (Email)</label>
          <input 
            type="email" 
            name="email"
            placeholder="operator@network.com" 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="ai-input-row">
          <div className="ai-input-group">
            <label>Security Phrase</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••" 
              onChange={handleChange}
              required 
            />
          </div>
          <div className="ai-input-group">
            <label>Confirm Phrase</label>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="••••••••" 
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <button type="submit" className="ai-submit-btn variants">Deploy Instance</button>

        <p className="ai-switch-mode">
          Already synced? <Link to="/login" className="ai-link">Access workspace</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;