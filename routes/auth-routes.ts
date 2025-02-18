import express from "express";
import {login, logout, refreshToken, signup} from "../services/auth-service";
import {authentication} from "../middlewares/auth-middleware";

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post("/logout",authentication, logout);
router.post("/refresh-token", refreshToken);

export default router