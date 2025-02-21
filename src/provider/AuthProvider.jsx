import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";


export const AuthContext = createContext(null);
const providerGoogle = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);


const logInWithGoogle = ()=>{
    return signInWithPopup(auth,providerGoogle);
}

const logOutUser = ()=>{
    setLoading(true);
    return signOut(auth);
}

    const userInfo = {
        user,
        setUser,
        loading,
        logInWithGoogle,
        logOutUser,
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>{
            unsubscribe();
        };
    }, []);


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;