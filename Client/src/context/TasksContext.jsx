import React, { createContext, useContext, useState } from 'react'
import { useFormState } from 'react-hook-form'
import { createTasksRequest, getTasksRequest, deleteTaskRequest } from '../api/tasks'


const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error('useTasks dería estar dentro de un TaskProvider')
    }
    return context
}

// Contenedor de todos los compenentes que quieran acceder a esto
export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([])

    // Obtener Tareas
    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        } catch (error) {
            console.error(error)
        }
    }


    // Crear tarea
    const createTask = async (task) => {
        const res = await createTasksRequest(task)
        console.log(res)
    }

    // Eliminar tarea
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        //Exportar el valor de las tareas
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask
        }}
        >
            {children}
        </TaskContext.Provider>
    )
}