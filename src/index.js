import app from "./app.js"
import { conectDB } from "./db.js"


conectDB();
app.listen(3000);
console.log('Servidor escuchando en el puerto', 3000);