
import React, { createContext, useState, useContext } from "react";
import { registerRequest } from '../api/auth'

export const AuthContext = createContext()

// Esto para: en lugar de estar importanto el AuthContext y el UseContex simplemente importamos el useAuth
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debería estar dentro de un AuthProvider')
    }
    return context
}

// Con el user, ya otras partes pueden leerlo
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
            // Cuando se registre
            setUser(res.data)
            // si todo va bien marca "true"
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    }

    // Todos los componentes que estén dentro, van a poder llamar tanto el dato de usuario como la funcion signup
    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}