import React from 'react'
import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import {
    Link, useNavigate
} from "react-router-dom";
function Register2() {
    const navigate = useNavigate();
    const [fnameReg, setfNameReg] = useState('');
    const [lnameReg, setlNameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [password2, setPassword2] = useState('')
    const [alert, setAlert] = useState('');
    const [fontColor, setFontColor] = useState('black')
    const [priv, setPriv] = useState('');

    const register = (e) => {
        if (fnameReg =='' || emailReg == '' || usernameReg =='' || passwordReg =='' || (password2!=passwordReg) || priv != 1 || passwordReg.length<=4){
            setAlert("Invalid registration. Please fill out every field, make sure passwords match, accept the privacy policy, and make sure password is longer than 5 characters.");
            setFontColor('#dc3545')
        }
        else{
        axios.post("https://3m5ce7ulx5.execute-api.us-east-2.amazonaws.com/createUser", {
            "uid":"123",
            "username":usernameReg,
            "email": emailReg,
            "first_name": fnameReg,
            "last_name": lnameReg,
            "password": passwordReg
        }).then((response) => {
            const resp = response.status;
            if (resp == 200){
                setAlert("Account created successfully!");
                setFontColor("#5aa864");
                localStorage.setItem('email',emailReg)
                navigate("/shop")
            }
            else{
                setAlert("Error registering user.");
                setFontColor('#dc3545')
            }
        });
    }
    };
  return (
    <div>
        <div className='container'>
                  <div className='container'>
          <h1 className='page-header'>Register</h1>
          <div className='login'>
              <br></br>
              <input type="text" name="fname" placeholder='First Name' 
              onChange={(e) => {
                  setfNameReg(e.target.value);
              }}>
              </input>
                  <br></br>
                  <br></br>
                  <input type="text" name="lname" placeholder='Last Name' 
              onChange={(e) => {
                  setlNameReg(e.target.value);
              }}>
              </input>
                  <br></br>
                  <br></br>
              <input type="email" required name="email" placeholder='Email'
              onChange={(e) => {
                  setEmailReg(e.target.value);
              }}>
              </input>
                  <br></br>
                  <br></br>
                  <input type="text" name="username" placeholder="Username" 
                  onChange={(e) => {
                  setUsernameReg(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <input type="password" name="password" placeholder='Password'
                  onChange={(e) => {
                  setPasswordReg(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <input type="password" name="password2" placeholder='Confirm Password'
                  onChange={(e) => {
                  setPassword2(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <h6>I Agree to the Privacy Policy</h6>
                  <input type="checkbox" id="demoCheckbox" name="checkbox" value="1" onChange={(e) => {
                  setPriv(e.target.value)}}></input>
                  <br></br>
                  <br></br>
                  <button className='blue-btn' onClick={register}>Register</button>
                  <br></br>
                  <br></br>
                 <a href="/">Back to Login</a>
                  <h5 style={{color: fontColor}}>{alert}</h5>
                  

          </div>
      </div>
        </div>
    </div>
  )
}

export default Register2