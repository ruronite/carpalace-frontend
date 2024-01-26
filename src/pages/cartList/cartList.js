import React, { useState, useEffect} from "react";

import { useNavigate, NavLink } from "react-router-dom";

import Cart from "../home/components/cart"

import {getCart, deleteItem, loggedInStatus} from "../../api/api"

import PORSCHE from "../home/resources/porsche.jpg";
import "./cartList.css"

function CartList() {
    /*const [cartItems, setCartItems] = useState([{
        "name": "Porsche",
        "price": 200900,
        "src": PORSCHE
    }]);*/

    const [cartItems, setCartItems] = useState([])

    const [loggedIn, setLoggedIn] = useState(false);
    const [total, setTotal] = useState(0);

    let navigate = useNavigate()

    useEffect(()=>{
        const getStatus = async()=>{
            let status  = await loggedInStatus();
            setLoggedIn(status);
            if(!status){
                navigate("/login")
            }
        }
        getStatus()       

    }, [])

    useEffect(()=>{
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
                setTotal(cartItems.total);
            }
            else {
                console.log("an error occured fetching cartItems")
            }
        }
    }

    const handleDelete = async(item)=>{
        let deleteStatus = await deleteItem(item);
        if (deleteStatus){
            getCartItems();
            alert(`${item.name} was successfully deleted`)
        }
        else {
            alert(`Deletion of ${item.name} was unsuccessful `)
        }
    }

    return (
        <main>
            <header>
                <nav>
                    <ul>
                        <li className="nav-links"><NavLink className="link-text" to="/">Car Palace</NavLink></li>
                        <li className="nav-links"><NavLink className="link-text" to="#cars" >Cars</NavLink></li>
                        <li className="nav-links"><NavLink className="link-text" to="/cart"><Cart cartItems={cartItems} /></NavLink></li>
                        <li className="nav-links"> {!loggedIn ? <NavLink className="link-text" id="login" to="/login">Login</NavLink> : <NavLink className="link-text" id="profile" to="/profile">profile</NavLink>} </li>
                    </ul>
                </nav>
            </header>

            <section id="cartList">
                <h2>Cart Page</h2>
                {cartItems.length > 0 ? <p className="headline">These are the items in your cart</p> : <p className="headline">There are currently no items in your cart</p>}
                {cartItems.map((item, ind) => {
                    return (
                        <div className="cart-card" key={item.name + ind}>
                            <figure>
                                <img src={item.src} alt={item.name} />
                            </figure>
                            
                            <div className="description">
                                <h4>{item.name}</h4>
                                <h5>price: ${item.price}</h5>
                            </div>

                            <button id="remove-item" onClick={()=>{handleDelete(item)}}> Remove Item </button>
                        </div>
                    )
                })}
            </section>
            <h2 id="total">Total: <span>${total}</span></h2>

            <footer>
                @ 2023 CarPalace
            </footer>
        </main>
    )
}

export default CartList;