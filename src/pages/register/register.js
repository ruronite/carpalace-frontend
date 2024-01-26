import React, {useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";

import {register} from "../../api/api";

function Register(){
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const[password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState(null);
    const [issue, setIssue] = useState(false);
    
    

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let details = {userName,firstName,password,email,location,phone}
        console.log("details", details)
        let feeback = await register(details);
        if(feeback.error){
            setIssue(true)
        }
        else{
            alert("registration successful")
            navigate("/login");

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
                <h2>Create an Account</h2>
                <form onSubmit = {handleSubmit} >
                    <label htmlFor="user-name">User Name</label>
                    <input id="user-name" type="text" name="user-name" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>

                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

                    <label htmlFor="phone-number">Phone Number</label>
                    <input type="tel" name="phone-number" id="phone-number" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>

                    <label htmlFor="location">location</label>
                    <input type="text" id="location" name="location" value={location} onChange={(e)=>{setLocation(e.target.value)}}/>

                    <button type="submit">Sign Up</button>
                    {issue && <p className="onboarding-error">user name already exists</p>}

                    <p>Already have an account? <Link to= "/login">Sign In</Link></p>
                    
                </form>

            </section>
        </div>
    )
}

export default Register;