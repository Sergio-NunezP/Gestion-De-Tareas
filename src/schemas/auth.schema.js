import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({ required_error: 'El Usuario es requerido' }),
    email: z.string({ required_error: 'El Correo es requerido' }).email({ message: 'Correo inválido' }),
    password: z.string({ required_error: 'Contraseña requerida' }).min(6, { message: 'Contraseña minimo de 6 caracteres' })
})

export const loginShchema = z.object({
    email: z.string({ required_error: 'El Correo es requerido' }).email({ message: 'Correo inválido' }),
    password: z.string({ required_error: 'Contraseña requerida' }).min(6, { message: 'Contraseña minimo de 6 caracteres' })
})