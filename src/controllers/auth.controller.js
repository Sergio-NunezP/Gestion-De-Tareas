import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    const { email, password, username } = req.body

    // Crear usuario
    try {

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


export const login = (req, res) => res.send('login')