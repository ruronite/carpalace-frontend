import React from "react";
import cartIcon from "./resources/cart-icon.png"

import "./resources/style.css"

function Cart(props){
    let items = props.cartItems;
    let itemNumber = items.length;
    console.log("Items contained in carts", items)
    console.log("Number of Items contained in carts", itemNumber)
    //let itemNumber = 0

    return (
        <div id="cart-container">
            <figure>
                <img src={cartIcon} alt=""/>
            </figure>
           {itemNumber > 0 && <div id= "cart-item-count">
                {itemNumber}
            </div>}

        </div>
    )

}

export default Cart;