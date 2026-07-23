import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface TokenPayload {
    userId: string;
    username: string;
    email: string;
}

export function generateToken(payload: TokenPayload) {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '1d'});
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
}