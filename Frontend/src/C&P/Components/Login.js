import React from 'react'
import axios from 'axios';
import {useRef, useState, useEffect} from 'react';
import {
    Link, useNavigate
} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username1, setUsername] = useState('')
    const [password1, setPassword] = useState('')
    const [alert, setAlert] = useState('');
    const [fontColor, setFontColor] = useState('black')
    const [loginStatus, setLoginStatus] = useState('')
const login = () =>{
        const email = username1;
        const password = password1;
        if (email == '' || password == ''){
            setAlert("Invalid login credentials.")
            setFontColor('#dc3545')
        }
        else{
            axios.post("https://exf166j6p4.execute-api.us-east-2.amazonaws.com/verification", 
            {
                "email":email,
                "password":password
            }
            ).then((response) => {
                const resp = response.data.body.verified
                console.log(resp)
                if (resp===true){
                    console.log("Logged in.")
                    localStorage.setItem('email',email)
                    navigate("/shop")
                }else{
                    setAlert("Invalid login credentials.")
                    setFontColor('#dc3545')
                }
            }).catch(function (error){
                 setAlert("Invalid login credentials.")
                 setFontColor('#dc3545')
            });

        }
    }
  return (
    <div>
              <div className='container'>
          <h1 className='page-header'>Login</h1>
          <div className='login'>
              <br></br>
                  <input type="text" name="username" placeholder="Username"
                  onChange={(e) => {
                  setUsername(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <input type="password" name="password" placeholder='Password'
                  onChange={(e) => {
                  setPassword(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <button className='blue-btn' onClick={login}>Login</button>
                  <br></br>
                  <br></br>
                  <p>Don't hace an account?<br></br>
                    <a href='/register'>Register</a>
                  <h5 style={{color: fontColor}}>{alert}</h5>
                  </p>

          </div>
    </div>
    </div>

  )
}

export default Login