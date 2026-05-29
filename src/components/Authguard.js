import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Token from "./Token";

function AuthGuard({ children }) {
    var token = useContext(Token)

    if (token) {
        return children
    }

    return <Navigate to="/login" replace />
}

export default AuthGuard;