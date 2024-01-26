import React from "react";
import cartIcon from "./resources/cart-icon.png"

import "./resources/style.css"

function Cart(props){
    /*let items = props.cartItems;
    let itemNumber = items.length;*/
    let itemNumber = 2

    return (
        <div id="cart-container">
            <figure>
                <img src={cartIcon} alt=""/>
            </figure>
            <div id= "cart-item-count">
                {itemNumber}
            </div>

        </div>
    )

}

export default Cart;