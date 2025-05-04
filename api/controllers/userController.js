import { createUser, getUserByEmail, getUserById, updateUser, deleteUser, getAllUsers } from '../Utils/userUtils.js';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '../Utils/authUtils.js';

// Criação de usuário
export const createUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const date = req.body.date || new Date();

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            name,
            email,
            password: hashedPassword, 
            date,
        });

        return res.status(201).json({ message: `Usuário ${newUser.name} criado com sucesso!` });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ message: "Erro ao criar usuário." });
    }
};

// Atualização de usuário
export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, date } = req.body;

        const existingUser = await getUserById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        const updatedUser = await updateUser(id, { name, email, password, date });

        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
};

// Busca todos os usuários
export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers(req.query);
        res.status(200).json(users);

    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Erro ao buscar usuários." });
    }
};

// Busca um usuário por ID
export const getUserByIdController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }
        res.status(200).json(user);

    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        res.status(500).json({ message: "Erro ao buscar usuário." });
    }
};

// Deletar usuário
export const deleteUserController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        await deleteUser(req.params.id);
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });

    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ message: "Erro ao deletar usuário." });
    }
};

// Login do usuário
export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "E-mail e senha são obrigatórios!" });
        }

        const user = await getUserByEmail(email); // Usa o método atualizado
        if (!user) {
            return res.status(400).json({ message: "E-mail ou senha inválidos!" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password); // Verifica a senha
        if (!passwordMatch) {
            return res.status(400).json({ message: "E-mail ou senha inválidos!" });
        }

        const token = generateToken(user.id); // Gera o token usando o ID do usuário

        // Inclua o `email` na resposta:
        return res.status(200).json({ 
            message: "Login bem-sucedido!", 
            token, 
            user: { 
                id: user.id,   // Inclui o ID do usuário
                name: user.name,
                email: user.email // Inclui o email do usuário na resposta
            }
        });
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).json({ message: "Erro ao realizar login." });
    }
};

