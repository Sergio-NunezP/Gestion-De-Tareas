import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    // acá está el signup que viene desde el AuthContext con sus valores
    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                registerErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <input type="text" {...register('username', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Nombre de Usuario'
                />
                {errors.username && (
                    <p className='text-red-500 font-bold'>Nombre de Usuario Requerido</p>
                )}

                <input type="email" {...register('email', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Correo Electrónico'
                />
                {errors.username && (
                    <p className='text-red-500 font-bold'>Email Requerido</p>
                )}

                <input type="password" {...register('password', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Contraseña'
                />
                {errors.username && (
                    <p className='text-red-500 font-bold'>Contraseña Requerida</p>
                )}
                <button type='submit'>
                    Registrate!
                </button>
            </form>

        </div>
    )
}

export default RegisterPage