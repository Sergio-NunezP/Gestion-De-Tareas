import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String,
        enum: ['Alta', 'Media', 'Baja'],
        default: 'Media'
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Completada'],
        default: 'Pendiente'
    },
    // Para guardar la informacion (tareas) por un usuario
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //hacemos referencia al "User de modelo" para tener ese id
        required: true
    },

},
    {
        timestamps: true
    })

export default mongoose.model('Task', taskSchema)

