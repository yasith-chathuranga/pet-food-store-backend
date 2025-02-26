import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from "./routes/auth-routes";
import dogFoodRoutes from "./routes/dog-food-routes";
import catFoodRoutes from "./routes/cat-food-routes";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.urlencoded({ extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes)
app.use('/api/dog-foods', dogFoodRoutes)
app.use('/api/cat-foods', catFoodRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
