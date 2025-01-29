import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"


function ProtectedRoute() {

    const { loading, isAuthenticated } = useAuth()
    // console.log(loading, isAuthenticated)

    if (loading) return <h1>Cargando..</h1>
    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

    // Continuar con el componente que está dentro
    return <Outlet />
}

export default ProtectedRoute