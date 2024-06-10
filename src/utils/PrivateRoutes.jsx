import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoutes(){
    const user = useAuth();
    return(
        user.token ? <Outlet /> : <Navigate to="/login" />
    )
}