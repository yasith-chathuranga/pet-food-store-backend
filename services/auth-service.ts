import {Request, Response} from "express";
import prisma from "../database/prisma-client";
import bcrypt from "bcryptjs"
import jwt, {Secret} from "jsonwebtoken"
import {generateAccessToken, generateRefreshToken} from "../jwt-utils/jwt-token";

export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            res.status(400).json({success: false, error: "Please provide all required details"});
            return;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({success: false, error: "User with this email already exists"});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({data: {username, email, password: hashedPassword, role: "USER"}});
        res.status(201).json({
            message: "User registered successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Registration failed. Please try again'
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

export const logout = async (req: Request, res: Response) => {
    try {
        const {email} = (req as any).user

        await prisma.user.update({
            where: {email},
            data: {refreshToken: null}
        })

        res.status(200).json({message: "User logged out successfully"})
    }catch (error){
        console.log(error)
        res.status(500).json({success: false, error: "Logout failed. Please try again"})
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(400).json({ error: "Refresh token is required!" });
            return;
        }

        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY as Secret) as { email: string };

        // Check if the refresh token matches the one in the database
        const user = await prisma.user.findUnique({ where: { email: decoded.email } });
        if (!user || user.refreshToken !== refreshToken) {
            res.status(403).json({ error: "Invalid refresh token!" });
            return;
        }

        const newAccessToken = generateAccessToken(decoded.email);
        const newRefreshToken = generateRefreshToken(decoded.email);

        // Update the refresh token in the database
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
        });
        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Refreshing token failed. Please try again' });
    }
}
