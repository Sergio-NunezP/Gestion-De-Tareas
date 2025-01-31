import Task from '../models/task.model.js'


// Obtener TODAS las tareas
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user')
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({ message: 'Algo salió mal' })

    }
}


// Crear
export const createTasks = async (req, res) => {
    try {
        const { title, description, date, priority = 'Media', status = 'Pendiente' } = req.body

        // "user: req.user.id" guarda las tareas en ese id nomás.
        const newTask = new Task({ title, description, date, priority, status, user: req.user.id })

        const savedTask = await newTask.save()
        res.json(savedTask)
    } catch (error) {
        return res.status(500).json({ message: 'Algo salió mal' })
    }
}


// Obtener UNA tarea
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user')
        if (!task) return res.status(400).json({ message: 'Tarea no encontrada' })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
    }
}


// Eliminar
export const deleteTasks = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
    }
}


// Ediatr
export const UpdateTasks = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
    }
}