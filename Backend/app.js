import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from "./Routes/userRouter.js";


dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());


app.get('/',(req, res)=>{
    res.send(`Backend is working on the this ${PORT}`);
    console.log(`Backend is working on the this http://localhost:${PORT}`);
});

app.use('/users', userRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});