import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const AuthWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("user"));
        if (!auth && location.pathname !== '/login' && location.pathname !== '/signup') {
            navigate('/login');
        }
    }, [location]);

    return <Outlet />;
};

export default AuthWrapper;
