import {Request, Response, NextFunction} from "express";
import jwt, {Secret} from "jsonwebtoken";

/**
 * Authentication middleware to verify that the user is authenticated by checking the presence
 * and validity of the access token in the "Authorization" header.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Access token is required!" });
        return;
    }

    jwt.verify(token, process.env.SECRET_KEY as Secret, (err, user) => {
        if (err) {
            res.status(403).json({ error: "Invalid or expired token!" });
            return;
        }
        (req as any).user = user;
        next();
    });
};