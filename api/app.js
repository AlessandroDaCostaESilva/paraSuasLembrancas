import express from 'express';
import userRoutes from './routes/userRoutes.js';
import cors from "cors";
import messageRoutes from './routes/messageRoutes.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors())
app.use(userRoutes);
app.use(messageRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});