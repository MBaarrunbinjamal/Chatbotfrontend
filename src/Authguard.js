import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
    var token = localStorage.getItem('token')

    if (token) {
        return children
    }

    return <Navigate to="/login" replace />
}

export default AuthGuard;