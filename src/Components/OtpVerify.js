import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import axios from 'axios';

const Otp = () => {
  const [otp, setOtp] = useState(''); 
  const navigate = useNavigate();

  const verifyOtp = async () => {
    try {
        const otpmailData = JSON.parse(localStorage.getItem('otpmail'));
        const email = otpmailData.user.email;
      const response = await axios.post('http://127.0.0.1:8000/api/user/verify/', {
        email: email,
        otp: otp,
      });

      if (response.status === 200) {
      
        navigate('/login?message=Account%20verified.%20Login%20now');
      } else {
       
        console.error('Verification failed:', response.data.message);
      }
    } catch (error) {
    
      console.error('Error during verification:', error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className='login'>Enter otp</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Enter otp"
            required
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button type="button" onClick={verifyOtp}>
          Verify
        </button>
        
      </form>
    </div>
  );
};

export default Otp;
