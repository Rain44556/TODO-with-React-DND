import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignInWithGoogle = () => {
    const {logInWithGoogle, setUser} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleGoogleLogin = () => {
        logInWithGoogle()
            .then(res => {
                const user = res.user;
                const userInfoInDB = {
                    userID: res.user.uid,
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
                    navigate("/addTask")
                }
            })
    })
}
    return (
        <div className=''>
            <button
            className='btn flex gap-2 px-5 py-5'
            onClick={handleGoogleLogin}
            ><FaGoogle size={20}></FaGoogle> Sign In With Google</button>
        </div>
    );
};

export default SignInWithGoogle;