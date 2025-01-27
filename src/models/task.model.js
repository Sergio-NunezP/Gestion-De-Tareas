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

