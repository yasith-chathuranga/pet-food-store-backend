import jwt, {Secret} from "jsonwebtoken";

export const generateAccessToken = (email: string) => {
    return jwt.sign({email}, process.env.SECRET_KEY as Secret, {expiresIn: "15m"})
}

export const generateRefreshToken = (email: string) => {
    return jwt.sign({email}, process.env.REFRESH_KEY as Secret, {expiresIn: "7d"})
}