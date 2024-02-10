import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/login.css'
import AuthContext from './AuthContext';

const Login = () => {
  let {loginUser, loginErrorMessage} = useContext(AuthContext)
  const location = useLocation();
  const message = new URLSearchParams(location.search).get('message')

  return (
    <div className="login-container">
      <form onSubmit={loginUser} className="login-form">
        <h2 className='login'>Login</h2>

        {message && <p className="success-message">{message}</p>}
        {loginErrorMessage && <p className="error-message">{loginErrorMessage}</p>}

        <div className="form-group">
          <input type="text" placeholder="Email" required name='email' />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" required name='password' />
        </div>
        <button type="submit">Login</button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
