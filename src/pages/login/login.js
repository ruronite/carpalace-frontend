import React,{useState} from "react";
import {NavLink, useNavigate, Link} from "react-router-dom";

import Cart from "../home/components/cart"

import "./login.css"
import {loggingIn, loggedInStatus} from "../../api/api"

function Login(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (userName.length === 0 || password.length === 0){
            alert("Please fill all fields")
        }
        else{
           let loginAttempt = await loggingIn(userName, password);
           if(loginAttempt.error){
               setErrorMessage(loginAttempt.message)
           }
           else{
               navigate("/");
           }
        }
    }


    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li className="nav-links"><NavLink className= "link-text" to="/">Car Palace</NavLink></li>
                        <li className="nav-links"><NavLink className= "link-text" to="#cars" >Cars</NavLink></li>
                        {/*<li className="nav-links"><NavLink className= "link-text" to="/cart"><Cart/></NavLink></li>*/}
                        {/*<li className="nav-links"> {!loggedIn ? <NavLink className= "link-text" id="login" to="/login">Login</NavLink> : <NavLink className= "link-text" id="profile" to="/profile">profile</NavLink>} </li>*/}
                    </ul>
                </nav>
            </header>
            <section id="details">
                <h2>Log In to Carpalace</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="user-name">Username or Email</label>
                    <input name="user-name" id="user-name" type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>

                    <p id="forgot-password">I forgot my password</p>

                    <button type="submit">Sign In</button>
                    {errorMessage && <p className="onboarding-error">{errorMessage}</p>}
                    <p>Or log in using:</p>
                    <div>google, facebook, github, linkedIn, twitter</div>
                    <p>Don't have an account? <Link to="/register">register here</Link> </p>

                </form>
            </section>
        </div>
    )
}

export default Login;