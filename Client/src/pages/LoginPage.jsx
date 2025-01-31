import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { signin, errors: signinErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate()

    // Botón con la función.
    const onSubmit = handleSubmit((data) => {
        signin(data)
    })

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl font-bold my-2'>Ingresar</h1>

                <form onSubmit={onSubmit}>
                    <input type="email" {...register('email', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Correo Electrónico'
                    />
                    {errors.email && (
                        <p className='text-red-500 font-bold'>Email Requerido</p>
                    )}

                    <input type="password" {...register('password', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Contraseña'
                    />
                    {errors.password && (
                        <p className='text-red-500 font-bold'>Contraseña Requerida</p>
                    )}
                    <button type='submit'
                        className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold px-3 py-1 rounded-md my-2'
                    >
                        Ingresar
                    </button>
                </form>

                <p className='flex gap-x-2 justify-between'>
                    ¿Aún no tienes una Cuenta? <Link to='/register'
                        className='text-sky-500'>Crear Cuenta</Link>
                </p>
            </div>

        </div>
    )
}

export default LoginPage