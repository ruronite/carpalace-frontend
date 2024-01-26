import React, {useState} from "react";
import { Outlet, NavLink } from "react-router-dom"
import Cart from "./components/cart";
import "./root.css"

function Root() {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <main>
        <header>
            <nav>
                <ul>
                    <li class="nav-links"><NavLink to="/">Car Palace</NavLink></li>
                    <li class="nav-links"><NavLink to="#cars" >Cars</NavLink></li>
                    <li class="nav-links"><NavLink to="/cart"><Cart /></NavLink></li>
                    <li class="nav-links"> {!loggedIn? <NavLink id="login" to="/login">Login</NavLink> :<NavLink id="profile" to="/profile">profile</NavLink>} </li> 
                </ul>
            </nav>
        </header>
        <section>
            <Outlet/>
        </section>

        <footer>
            @ 2023 CarPalace
        </footer>

        </main>

    )
}

export default Root