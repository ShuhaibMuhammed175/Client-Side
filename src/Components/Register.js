import React, { useContext, useState } from 'react'
import '../css/register.css'
import { Link } from 'react-router-dom'
import AuthContext from './AuthContext'

const Register = () => {

    let {registerUser, errorMessage} = useContext(AuthContext)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password === confirmPassword) {
            console.log('Password match, proceed with registration')
            registerUser({
                email: e.target.email.value,
                username: e.target.username.value,
                password: e.target.password.value
            })
        }
        else {
            setPasswordsMatch(false);
        }
    }

  return (
    <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
        <h2 className='register'>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
            <input type="text" placeholder="Username" required name='username'/>
        </div>
        <div className="form-group">
            <input type="email" placeholder="Email" required name='email'/>
        </div>

        <div className="form-group">
            <input type="password"
            placeholder="Password" 
            required
            name='password'
            value={password}
            onChange={handlePasswordChange} />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordsMatch && (
            <p className="password-mismatch">
              Passwords do not match
            </p>
          )}
        </div>

        <button type="submit">Register</button>
        <p className="login-link">Already have an account? <Link to='/login'>Login</Link></p>
        </form>
  </div>
  )
}


export default Register

  

