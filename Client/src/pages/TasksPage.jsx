import React, { useEffect, useState } from 'react'
import { useTasks } from '../context/TasksContext'
import TaskCard from '../components/TaskCard'

function TasksPage() {
    const { getTasks, tasks } = useTasks()
    const [filteredTasks, setFilteredTasks] = useState(tasks)
    const [priorityFilter, setPriorityFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        let filtered = tasks

        if (priorityFilter) {
            filtered = filtered.filter(task => task.priority === priorityFilter)
        }

        if (statusFilter) {
            filtered = filtered.filter(task => task.status === statusFilter)
        }

        setFilteredTasks(filtered)
    }, [tasks, priorityFilter, statusFilter])

    const handlePriorityChange = (event) => {
        setPriorityFilter(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value)
    }

    if (filteredTasks.length === 0) return <h1>No hay tareas</h1>

    return (
        <div className='p-4'>
            {/* Filtros */}
            <div className="mb-4">
                <label className="mr-2">Filtrar por prioridad:</label>
                <select onChange={handlePriorityChange} className="bg-zinc-700 text-white px-4 py-2 rounded-md">
                    <option value="">Todas</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>

                <label className="mr-2 ml-4">Filtrar por estado:</label>
                <select onChange={handleStatusChange} className="bg-zinc-700 text-white px-4 py-2 rounded-md">
                    <option value="">Todos</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completada">Completada</option>
                </select>
            </div>

            {/* Mostrar tareas filtradas */}
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
                {filteredTasks.map((task) => (
                    <TaskCard task={task} key={task._id} />
                ))}
            </div>
        </div>
    )
}

export default TasksPage
