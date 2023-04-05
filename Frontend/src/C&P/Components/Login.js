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
            console.log("Empty input fields")
            setAlert("Invalid login credentials.")
            setFontColor('#dc3545')
        }
        else{
        axios.get(`https://3m5ce7ulx5.execute-api.us-east-2.amazonaws.com/getUsers`, {
        }).then((response) => {
            const status = (JSON.parse(response.data.body));
            let found=false
            let foundIndex=0
            for (let i=0;i<status.length;i++){
                if (status[i].email===email){
                    found = true
                    foundIndex=i
                }
                else{
                    continue
                }
            }
            if (found===true){
                console.log("Found!")
                if(status[foundIndex].password===password){
                    console.log("User Logged In!")
                    localStorage.setItem('email',email)
                    navigate("/shop")
                }else{
                    console.log("Password incoorect")
                    setAlert("Invalid login credentials.")
                    setFontColor('#dc3545')
                }
            }else{
                console.log("User not found")
                setAlert("Invalid login credentials.")
                setFontColor('#dc3545')
            }
        })
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