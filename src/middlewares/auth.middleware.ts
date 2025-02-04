import { Request, Response, NextFunction } from "express"

import jwt from "jsonwebtoken"

import dotenv from "dotenv"

dotenv.config();

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (request: AuthRequest, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        response.status(401).json({
            status: "error",
            message: "Token não fornecido!",
            code: 401
        });
        return;
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        response.status(500).json({
            status: "error",
            message: "Erro de configuração do servidor",
            code: 500
        });
        return;
    }
    try {
        const [, token] = authHeader.split(' ');
        const decoded = jwt.verify(token, jwtSecret);
        const { } = decoded;
        request.user = decoded;
        next();
    } catch (error) {
        response.status(401).json({
            status: "error",
            message: "Token inválido ou expirado",
            code: 401
        });
    }
}