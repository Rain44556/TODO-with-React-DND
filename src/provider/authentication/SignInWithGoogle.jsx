import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';

const SignInWithGoogle = () => {
    const {logInWithGoogle, setUser} = useContext(AuthContext);

    const handleGoogleLogin = () => {
        logInWithGoogle()
            .then(res => {
                const user = res.user;
                const userInfoInDB = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                }
                setUser(user)
                fetch('http://localhost:5000/users', {
                method: "POST",
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userInfoInDB)
            })
            .then(res => res.json())
            .then(data  => {
                if(data.insertedId){
                    toast.success('user created in db')
                }
            })
    })
}
    return (
        <div className='card my-16 h-[500px] justify-center items-center shadow-lg mx-auto w-1/2'>
            <button
            className='btn flex gap-2 px-10 py-7'
            onClick={handleGoogleLogin}
            ><FaGoogle size={20}></FaGoogle> Sign In With Google</button>
        </div>
    );
};

export default SignInWithGoogle;