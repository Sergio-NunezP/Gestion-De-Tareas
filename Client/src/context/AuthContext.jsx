
import React, { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verityTokenRequest } from '../api/auth'

import Cookies from "js-cookie";

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
    //Acceso al usuario global
    const [user, setUser] = useState(null)
    // Si está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    // Errores
    const [errors, setErrors] = useState([])
    // Estado de carga
    const [loading, setLoading] = useState(true)

    // Registrar
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

    // Acceder
    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }


    // Cerrar sesión.
    const logout = () => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
    }


    // SetTimeout para Errores
    useEffect(() => {
        if (errors.length > 0) {
            const time = setTimeout(() => {
                setErrors([])
            }, 3000);
            return () => clearTimeout(time)
        }
    }, [errors])


    // Verifica el token y depende de ello redirecciona o da error
    useEffect(() => {
        async function CheckLogin() {
            const cookies = Cookies.get()

            // Si NO hay token
            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            // si SI Hay token
            try {
                const res = await verityTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                // si responde un dato (token) el usuario está allí y:
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        CheckLogin()
    }, [])


    // Todos los componentes que estén dentro, van a poder llamar tanto el dato de usuario como la funcion signup
    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}