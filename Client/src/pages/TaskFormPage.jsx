import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext'
import { useNavigate, useParams } from 'react-router-dom'

// Para la fecha
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


function TaskFormPage() {

    const { register, handleSubmit, setValue, } = useForm()
    const { createTask, getTask, updateTask } = useTasks()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id)
                console.log(task)
                setValue('title', task.title)
                setValue('description', task.description)
                setValue('priority', task.priority)
                setValue('status', task.status)
                // setValue('date', dayjs.utc(task.date).format('DD/MM/YYYY'))
            }
        }
        loadTask()
    }, [])


    // cada que tipeo se va actulizar con los nuevos datos
    const onSubmit = handleSubmit((data) => {
        const dataValid = {
            ...data,
            date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
        }

        if (data.date) dataValid.date = dayjs.utc(data.date).format()

        if (params.id) {
            updateTask(params.id, dataValid)
        } else {
            createTask(dataValid)
        }
        //Cuando se haya creado la tarea va a navegar al /tasks
        navigate('/tasks')
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>

                    <label htmlFor="title">Titulo</label>
                    <input type="text" placeholder='Titulo' {...register('title')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 '
                        autoFocus
                    />

                    <label htmlFor="description">Descripción</label>
                    <textarea rows='3' placeholder='Descripción' {...register('description')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>

                    <label htmlFor="date">Fecha</label>
                    <input type="date" {...register('date')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

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
        </div>
    )
}

export default TaskFormPage