import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err){
            setErr(true);
        }
        
        
    }

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className="logo">Chat</span>
                <span className="title">Sign In</span>
                <form className="registerForm" onSubmit={handleSubmit}>
                    <input type="email" name="" id="" placeholder="email"/>
                    <input type="password" name="" id="" placeholder="password"/>
                    
                    <button>Sign In</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login