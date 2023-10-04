import React, { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(false)
    const [err, setErr] = useState(false)

    const {currentUser} = useContext(AuthContext);
    
    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username))
        
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch(err){
            setErr(true)
            console.log(err)
        }
    };

    const handleKey = e => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () =>{
        // check whether the group (chats in firestore) exists, if not, create
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        
        try{
            const res = await getDoc(doc(db, "chats", combinedId))

            if(!res.exists()){
                await setDoc(doc(db, "chats", combinedId), { messages: [] })

                await setDoc(doc(db, "userChats", currentUser.uid),{
                    [combinedId]:{
                        userInfo: {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL
                        
                        },
                        date: serverTimestamp()
                    }
            
                })

                await setDoc(doc(db, "userChats", user.uid),{
                    [combinedId]:{
                        userInfo: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL
                        },
                        date: serverTimestamp()
                    }
                })
            } else{
                await updateDoc(doc(db, "userChats", currentUser.uid),{
                    [combinedId]:{
                        userInfo: {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL
                        
                        },
                        date: serverTimestamp()
                    }
            
                })

                await updateDoc(doc(db, "userChats", user.uid),{
                    [combinedId]:{
                        userInfo: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL
                        },
                        date: serverTimestamp()
                    }
                })
            }

        }catch(err){
            console.log(err)
            setErr(true)
        }

        setUser(null);
        setUsername("")
    };

    return (
        <div className="search">
            {err && <span>User not found</span>}
            <div className="searchForm">
                <input 
                    type="text"
                    placeholder="Find a user" 
                    onKeyDown={handleKey} 
                    onChange={e=>setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search