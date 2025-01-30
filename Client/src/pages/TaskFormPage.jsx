import React from 'react'
import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext'
import { useNavigate } from 'react-router-dom'


function TaskFormPage() {

    const { register, handleSubmit } = useForm()
    const { createTask } = useTasks()
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        createTask(data)
        //Cuando se haya creado la tarea va a navegar al /tasks
        navigate('/tasks')
    })

    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder='Titulo' {...register('title')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 '
                    autoFocus
                />

                <textarea rows='3' placeholder='Descripción' {...register('description')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                ></textarea>

                {/* Selección de Prioridad */}
                <label className='text-white block my-2'>Prioridad:</label>
                <select
                    {...register('priority')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>

                {/* Selección de Estado (Opcional) */}
                <label className='text-white block my-2'>Estado:</label>
                <select
                    {...register('status')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completada">Completada</option>
                </select>

                <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'>
                    Guardar
                </button>

            </form>
        </div>
    )
}

export default TaskFormPage