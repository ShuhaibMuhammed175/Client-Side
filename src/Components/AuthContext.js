import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    
    
    let [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [user, setUser] = useState(() => authToken ? jwtDecode( authToken.access ) : null)
    let navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const [loginErrorMessage, SetLoginErrorMessage] = useState('');

  
    let registerUser = async (userData) => {
        
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/user/register/',userData )

        if (response.status === 201) {
            navigate('/verify-otp')
            let data = response.data
            localStorage.setItem('otpmail', JSON.stringify(data))
        }
       
        
        }
        catch (error) {
           
            if (error.response.status === 400) {
                setErrorMessage('User with this email already exists');
            } else {
                setErrorMessage('An unexpected error occurred during registration');
            }
        }
    }


    let loginUser = async (e) => {
        e.preventDefault()
       
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/user/token/', 
                {
                'email': e.target.email.value,
                'password': e.target.password.value
                })
           
            let data = response.data
          
            if (response.status === 200) {
                setAuthToken(data);
                setUser(jwtDecode( data.access ))
                localStorage.setItem('authToken', JSON.stringify(data));
                localStorage.removeItem('otpmail');
                navigate('/');
            } 
           
            } 
        catch (error) {
            if (error.response.status === 401) {
                SetLoginErrorMessage('User not found')
            }
            }
        }
    

        let logoutUser = () => {
            setAuthToken(null)
            setUser(null)
            navigate('/')
            localStorage.removeItem('authToken')
        }
    


        const updateToken = async () => {
            console.log(`Updated token called`)
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/user/token/refresh/', {
                    'refresh': String(authToken.refresh)
                });
                const data = response.data;
        
                if (response.status === 200) {
                    setAuthToken(data);
                    setUser(jwtDecode(data.access));
                    localStorage.setItem('authToken', JSON.stringify(data));
                } else {
                    console.log(`inside else statement`);
                    logoutUser();
                }
            } catch (error) {
                console.error('Error occurred during token refresh:', error);
                logoutUser();
                navigate('/login')
                
            }
        };
       
    let contextData = {
        user:user,
        registerUser:registerUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
        updateToken:updateToken,
        authToken:authToken,
        errorMessage:errorMessage,
        loginErrorMessage:loginErrorMessage
    }

    useEffect ( () => {
       let time = (1000 * 60) * 4
        const interval = setInterval( () => {
            if(authToken) {
                updateToken()
            }
        }, time )
        return ( ) => clearInterval(interval) 
    }, [authToken] )

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;