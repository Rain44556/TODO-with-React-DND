import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext);
    if(loading){
        return <h1>loading</h1>;
    }
    if(user && user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to={"/googleLogin"}></Navigate>;
};

export default PrivateRoute;