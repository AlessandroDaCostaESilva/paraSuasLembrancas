import express from 'express';
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from "./routes/cartRoutes.js"
import emailRoutes from "./routes/emailRoutes.js";
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const port = 5000;

// Middlewares
app.use(express.json()); 
app.use(cors());

// Rotas
app.use(userRoutes);
app.use(messageRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(emailRoutes);
app.use(orderRoutes);
app.use('/images', express.static('images'));


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});