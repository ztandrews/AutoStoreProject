import React, {useState} from "react"
//route = switch in react 7
import { useNavigate } from "react-router-dom";
import { Link, useNavigate} from "react-router-dom";
//navigate = history in react 7

function LoginForm({Login,error}) {
  
    let nav = useNavigate();
//local detailes   
    const [details, setDetails]=useState({name: "",email: "",password: ""});
//handles submitions
    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }
    return (
        <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>AutoShop Login</h2>
                    {(error != "") ? (<div className="error">{error}</div>) : ""}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <input type="submit" value="Login" />
                    <br></br>
                    <button onClick={() => {
                        nav("./RegisterForm");
                    }
                
                }
                    >Register</button>
                </div>
            </form>
        );
    }
 export default LoginForm;