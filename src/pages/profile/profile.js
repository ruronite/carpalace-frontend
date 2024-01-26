import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import ProfileImg from "./resources/profile-icon.png"
import "./profile.css";
import Cart from "../home/components/cart"

import { getCart, loggedInStatus, getProfile, logOut } from "../../api/api"


function Profile() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            let userProfile = await getProfile();
            console.log("fetched profile", userProfile);
            
            if (!userProfile) {
                console.log("No profile found")
                navigate("/login");
            }
            else {
                setLoggedIn(true);
                setLoading(false)
                setUserInfo(userProfile);
            }
        }
        fetchData()
    }, [])

    useEffect(()=>{
        getCartItems()
    },[loggedIn])

    async function getCartItems() {
        console.log("getting cartItems", loggedIn)
        if (loggedIn) {
            console.log("about to get cart")
            let cartItems = await getCart();
            console.log("Items got", cartItems)
            if (cartItems) {
                console.log("cart Items are: ", cartItems.cartItems);
                setCartItems(cartItems.cartItems);
            }
            else {
                console.log("an error occured fetching cartItems")
            }
        }
    }

    const handleLogOut = async()=>{
        let logoutStatus = await logOut();
        if (logoutStatus){
            navigate("/login")
        }
        else {
            alert("Error logging out")
        }
    }


    return (
        <main id="user-profile">
            {loading ? <h1>loading...</h1> :
                <div>
                    <header>
                        <nav>
                            <ul>
                                <li className="nav-links"><NavLink className="link-text" to="/">Car Palace</NavLink></li>
                                <li className="nav-links"><NavLink className="link-text" to="/#cars" >Cars</NavLink></li>
                                <li className="nav-links"><NavLink className="link-text" to="/cart"><Cart cartItems={cartItems} /></NavLink></li>
                                <li className="nav-links"> {loggedIn && <button className="link-text" id="logout" onClick={handleLogOut} >Log Out</button>} </li>
                            </ul>
                        </nav>
                    </header>
                    <section id="profile-hero">
                        <figure className="profile-img-container">
                            <img src={ProfileImg} alt="" />
                        </figure>
                        <h4>{userInfo.user_name}</h4>
                    </section>
                    <section id="personal-info">
                        <h2>Personal Information </h2>
                        <div className="info-card">
                            <p>First Name:</p>
                            <p>{userInfo.first_name}</p>
                        </div>
                        <div className="info-card">
                            <p>Email:</p>
                            <p>{userInfo.email}</p>
                        </div>
                        <div className="info-card">
                            <p>Phone :</p>
                            <p>{userInfo.phone}</p>
                        </div>
                        <div className="info-card">
                            <p>Location:</p>
                            <p>{userInfo.location}</p>
                        </div>

                    </section>

                    <footer>
                        @ 2023 CarPalace
            </footer>
                </div>}

        </main>
    )
}

export default Profile;