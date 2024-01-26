//local endpoint 
//const endpoint = "http://localhost:8000";
const endpoint = "https://carpalace-backend.onrender.com"

const getCart = async () => {
    try {
        let response = await fetch(`${endpoint}/getCart`,{
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 200) {
            let cart = await response.json();
            return cart
        }

    } catch (error) {
        console.log(error)
        return (null)
    }

}

const addToCart = async (item) => {
    try {
        let response = await fetch(`${endpoint}/addtocart`, {
            method: "PUT",
            body: JSON.stringify(item),
            credentials: "include",
            headers: {
                "Content-Type": "application/json" 
            }

        })
        if (response.status === 200) {
            let jsonResponse = await response.json();
            return jsonResponse;
        }
        else if (response.status === 401){
            return ("unauthorized")
        }
        else {
            return(null)
        }

    } catch (error) {
        console.log(error)
        return (null)
    }
}

const deleteItem = async (item) => {
    try {
        let response = await fetch(`${endpoint}/delete-item`, {
            method: "DELETE",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (response.status === 204){
            return true
        }
        else {
            return null
        }

    } catch (error) {
        console.log(error)
    }
}

const loggingIn = async (userName, password) => {
    try {
        let response = await fetch(`${endpoint}/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ userName, password })
        });
        let jsonResponse = await response.json();
        console.log("returned response", jsonResponse);
        return jsonResponse;
        /*if (response.status === 200) {
            let jsonResponse = await response.json();
            return jsonResponse;
        }*/

    } catch (error) {
        console.log(error)
    }
}

const loggedInStatus = async () => {
    try {
        let response = await fetch(`${endpoint}/loginstatus`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                // Add other headers if needed
            }
        });
        if (response.status === 200) {
            let jsonResponse = await response.json();
            return jsonResponse;
        }

    } catch (error) {
        console.log(error)
    }
}

const register = async (details) => {
    try {
        let response = await fetch(`${endpoint}/register`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            method: "POST",
            body: JSON.stringify(details)
        });
        let jsonResponse = await response.json();
        return jsonResponse;


    } catch (error) {
        console.log(error)

    }
}

const getProfile = async () => {
    try {
        let response = await fetch(`${endpoint}/profile`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                // Add other headers if needed
            }
        });
        if (response.status === 200) {
            console.log("response", response)
            let jsonResponse = await response.json();
            console.log("Profile", jsonResponse);
            return jsonResponse;
        }

        else if (response.status === 401) {
            console.log("401 status")
            return null
        }

        else {
            console.log("error status")
            return null
        }

    } catch (error) {
        console.log(error)
        return null
    }

}

const logOut = async()=>{
    try {
        let response = await fetch(`${endpoint}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (response.status === 200){
            return true
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error) 
        return null       
    }
}

export { getCart, addToCart, deleteItem, loggingIn, loggedInStatus, register, getProfile, logOut };
