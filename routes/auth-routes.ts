import express from "express";
import {login, signup} from "../services/auth-service";

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

export default router