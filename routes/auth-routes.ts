import express from "express";
import {signup} from "../services/auth-service";

const router = express.Router()

router.post('/signup', signup)

export default router