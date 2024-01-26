import React from "react";

import {RouterProvider,createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";

import Root from "./pages/root/root";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import CartList from "./pages/cartList/cartList";
import Profile from "./pages/profile/profile";

let loggedIn= true;

{/*<Route path="/" element = {<Root/>} >*/}

{/*</Route>*/}

const router = createBrowserRouter(
  createRoutesFromElements(
    <> 
    
      <Route path="/" element = {<Home/>}  />
      <Route path="/login" element = {<Login/>}  />
      <Route path="/register" element={ <Register/> }/>
      <Route path = "/cart" element = { <CartList/> } /> 
      <Route path = "/profile" element= {<Profile/>} />
    </>
  )
)



function App() {
  return (
    <RouterProvider router ={router} />
  );
}

export default App;
