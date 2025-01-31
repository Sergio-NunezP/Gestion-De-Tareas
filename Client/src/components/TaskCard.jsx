import React from 'react'
import { useTasks } from '../context/TasksContext'
import { Link } from 'react-router-dom'


function TaskCard({ task }) {

    const { deleteTask } = useTasks()

    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <header className='flex justify-between'>
                <h1 className='text-2xl font-bold'>{task.title}</h1>
                <div className='flex gap-x-2 items-center'>

                    <button
                        className='bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md'
                        onClick={() => { deleteTask(task._id) }}>
                        Eliminar
                    </button>
                    <Link to={`/tasks/${task._id}`}
                        className='bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md'
                    >Editar</Link>
                </div>
            </header>
            <p className='text-slate-300'>{task.description}</p>
            <p>📅 {new Date(task.date).toLocaleDateString()}</p>
            <p>⚡ Prioridad: <span className='font-semibold'>{task.priority}</span></p>
            <p>✅ Estado: <span className={task.status === 'Completada' ? 'text-green-500' : 'text-yellow-500'}>
                {task.status}
            </span></p>
        </div>
    )
}

export default TaskCard

