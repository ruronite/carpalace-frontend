import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"

import "./resources/home.css";

import cars from "./cars.js";
import Cart from "./components/cart";

import { getCart, addToCart, deleteItem, loggedInStatus } from "../../api/api";

function Home(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    /*useEffect(()=>{
        let cartList = getCart();
        setcartItems(setcartItems);

    }, [])*/

    useEffect(() => {
        const getStatus = async () => {
            let status = await loggedInStatus();
            console.log("login status", status)
            setLoggedIn(status)
            /*if (status) {
                getCartItems()
            }*/
        }
        getStatus();
    }, [])

    useEffect (()=>{
        getCartItems()
    }, [loggedIn])

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

    const cartAdd = async (item) => {
        //alert("adding to cart")
        console.log("added Item", item)
        let addedItem = await addToCart(item);
        if (addedItem.message === "success") {
            alert("Item added to cart")
            //get updated cart List
            getCartItems();
        }
        else if (addedItem === "unauthorized") {
            alert("please login to add Items to cart")
        }
        else {
            alert("error adding item to cart")
        }
        //let ItemToAdd = {newItem: item}
    }

    return (
        <main>
            <header>
                <nav>
                    <ul>
                        <li className="nav-links"><NavLink className="link-text" to="/">Car Palace</NavLink></li>
                        <li className="nav-links"><a className="link-text" href="/#cars" >Cars</a></li>
                        <li className="nav-links"><NavLink className="link-text" to="/cart"><Cart cartItems={cartItems} /></NavLink></li>
                        <li className="nav-links"> {!loggedIn ? <NavLink className="link-text" id="login" to="/login">Login</NavLink> : <NavLink className="link-text" id="profile" to="/profile">profile</NavLink>} </li>
                    </ul>
                </nav>
            </header>




            <div>
                <section id="hero">
                    <p>
                        Find your dream car today
            </p>
                </section>
                <section id="cars">
                    <h3>cars</h3>
                    <p>Here are our latest car brands</p>
                    <div id="car-gallery">
                        {cars.map((car, ind) => {
                            return (
                                <div className="car-brands-container" key={car.name + ind}>
                                    <figure >
                                        <img className="car-brands" src={car.src} alt={car.name} />
                                    </figure>
                                    <h4>{car.name}</h4>
                                    <h6>$ {car.price}</h6>
                                    <button onClick={() => { cartAdd(car) }} className="cart-add">Add to Cart</button>
                                </div>)
                        })}
                        {/*JSON.stringify(cars)*/}

                    </div>

                </section>
            </div>
            <footer>
                @ 2023 CarPalace
            </footer>

        </main>
    )
}

export default Home;