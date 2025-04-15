import jwt from 'jsonwebtoken';


const JWT_SECRET_KEY = 'secreta-chave-jwt';

const JWT_EXPIRES_IN = '1h';


export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
};
