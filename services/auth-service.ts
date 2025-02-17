import {Request, Response} from "express";
import prisma from "../database/prisma-client";
import bcrypt from "bcryptjs"
import jwt, {Secret} from "jsonwebtoken"
import {generateAccessToken, generateRefreshToken} from "../jwt-utils/jwt-token";

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({success: false, error: "User with this email already exists",});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {username, email, password: hashedPassword, role: "USER"}
        })
        res.status(201).json({
            message: "User registered successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Registration failed. Please try again',
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ success: false, error: "User with this email does not exist" });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json({ success: false, error: "Invalid password" });
            return;
        }

        const accessToken = generateAccessToken(email)
        const refreshToken = generateRefreshToken(email)

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken, refreshToken, role: user.role
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Login failed. Please try again' });
    }
}
