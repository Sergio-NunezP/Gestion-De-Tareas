import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import userModel from '../models/user.model.js'


// REGISTRO DE USUARIO
export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {
        const userFound = await User.findOne({ email })
        if (userFound)
            return res.status(400).json(['El correo ya está en uso'])

        // Encriptar password
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        // Guardar usuario
        const userSaved = await newUser.save()
        // creamos el token
        const token = await createAccessToken({ id: userSaved._id })

        // Guardar en una cookie
        res.cookie('token', token)
        // Respuesta
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body


    try {

        // Verificar usuario
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

        // Verificar password
        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' })

        // creamos el token
        const token = await createAccessToken({ id: userFound._id })

        // Guardar en una cookie
        res.cookie('token', token)
        // Respuesta
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Cancelar o Cerrar el TOKEN 
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

// Validar Token
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user._id)

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })

    res.send('profile')
}