import axios from 'axios';
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  let Navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: ''
  });

  const [errors, setErrors] = useState({});

  const handleUsername = (e) => {
    setFormData({ 
      ...formData, 
      username: e.target.value 
    });
  };
  const handleEmail = (e) => {
    setFormData({ 
      ...formData, 
      email: e.target.value 
    });
  };
  const handlePassword = (e) => {
    setFormData({ 
      ...formData, 
      password: e.target.value 
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit =async  (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      //Api call to signup

      let register= await axios.post('http://localhost:3000/auth/signup', formData);
      if(register.data.msg){
        console.log(register.data.msg);
        alert(register.data.msg);
        console.log('Form Data:', formData);
        Navigate('/login'); // Redirect to login page after successful signup
      }else{
        alert("failed to register user right now..!");

      }
      // alert('Signup Successful! 🎉');
    }
  };

  return (
    <div className="container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="row shadow-lg rounded-4 overflow-hidden" style={{ width: '90%', maxWidth: '900px', background: '#fff' }}>
        
        {/* Form Section */}
        <div className="col-md-6 p-5 d-flex align-items-center">
          <div style={{ width: '100%' }}>
            <h2 className="text-center mb-4" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px' }}>
              Create Your Account
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><FaUser /></span>
                  <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                    name="name" 
                    value={formData.name}
                    onChange={handleUsername}
                    placeholder="Enter your name"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><FaEnvelope /></span>
                  <input 
                    type="email" 
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                    name="email" 
                    value={formData.email}
                    onChange={handleEmail}
                    placeholder="Enter your email"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><FaLock /></span>
                  <input 
                    type="password" 
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                    name="password" 
                    value={formData.password}
                    onChange={handlePassword}
                    placeholder="Enter password"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-dark w-100 rounded-pill">Sign Up</button>
            </form>

            <p className="text-center mt-3 small">
              Already have an account? <a href="/login" className="text-decoration-none">Login</a>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="https://i.pinimg.com/736x/59/8a/46/598a466796ce513d6f10e4cea5314f8b.jpg" 
            alt="Signup Visual"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

      </div>
    </div>
  );
};

export default Signup;
