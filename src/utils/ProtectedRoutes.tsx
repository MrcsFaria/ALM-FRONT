import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const user = localStorage.getItem('userName');
    return user ? <Outlet/> : <Navigate to="/SignIn"/>
}

export default ProtectedRoutes