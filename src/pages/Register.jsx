import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    setErr(true);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        try{
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: downloadURL
                            });
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL
                            });
                            await setDoc(doc(db, "userChats", res.user.uid), {});
                            navigate("/");
                        } catch(err){
                            console.log(err);
                            setErr(true);
                        }
                        

                    });
                }
                );
        } catch (err){
            setErr(true);
        }
        
        
    };
    
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className="logo">Chat</span>
                <span className="title">Register</span>
                <form className="registerForm" onSubmit={handleSubmit}>
                    <input type="text" name="" placeholder="display name"/>
                    <input type="email" name="" placeholder="email"/>
                    <input type="password" name="" placeholder="password"/>
                    <input type="file" name="" id="file"/>
                    <label htmlFor="file" className="avatar">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Already have an account?<Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register