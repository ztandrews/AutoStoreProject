import React from 'react'
import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
function Register2() {
    const [fnameReg, setfNameReg] = useState('');
    const [lnameReg, setlNameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [alert, setAlert] = useState('');
    const [fontColor, setFontColor] = useState('black')

    const register = (e) => {
        if (fnameReg =='' || emailReg == '' || usernameReg =='' || passwordReg ==''){
            setAlert("Invalid registration. Please fill out every field.");
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
              <input type="text" name="email" placeholder='Email'
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