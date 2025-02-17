import {Request, Response} from "express";
import prisma from "../database/prisma-client";
import bcrypt from "bcryptjs"

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
