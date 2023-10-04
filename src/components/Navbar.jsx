import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    
    return (
        <div className="navbar">
            <span className="navLogo">Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" className="navImage"/>
                <span>{currentUser.displayName}</span>
                <button className="logout" onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

export default Navbar