import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../hook/useAuth";

const RequireAuth = ({children}) => {
    const location = useLocation();
    const {user} = useAuth();

    if (!user){
        return <Navigate to='/' state={{from: location}}/>
    }

    return children;
};

export {RequireAuth};