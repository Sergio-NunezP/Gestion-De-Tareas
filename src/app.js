import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(authRoutes)

// todas las rutas del backend tienen este "/api"
app.use('/api', authRoutes)


export default app