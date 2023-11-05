import { createContext, useEffect, useState } from "react";
import { app } from "./firebase.config";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


// Exporting 
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    
    // Start declaring variables from here
    const testing = 'Hello world'
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    // Firebase authentication
    const auth = getAuth(app);

    //  google
    const provider = new GoogleAuthProvider();
    const connectGoogle = () =>{
        return signInWithPopup(auth,provider);
    }

    //    sign up
    const createUser = (email , password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    //    sign in 
    const loginUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    //   hold user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])
    //  log out 
    const logOut = () =>{
        return signOut(auth);
    }


    // ...................Firebase End................... 


    // Pass data from here !!
    const data = {
        testing,
        user,
        loading,
        createUser,
        loginUser,
        setLoading,
        logOut,
        connectGoogle,
        auth
    }

    // Main part
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;