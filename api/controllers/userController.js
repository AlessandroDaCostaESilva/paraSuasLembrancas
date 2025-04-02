import { createUser, getUserByEmail, getUserById, updateUser, deleteUser, getAllUsers } from '../Utils/userUtils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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



export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, date} = req.body;

       
        const existingUser = await getUserById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }


        const updatedUser = await updateUser(id, { name, email, password, date});

        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers(req.query);
        res.status(200).json(users);

    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Erro ao buscar usuários." });
    }
};

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

export const loginUserController = async (req, res) => {
    try {
        console.log("Dados recebidos no login:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            console.log("E-mail ou senha não fornecidos.");
            return res.status(400).json({ message: "E-mail e senha são obrigatórios!" });
        }

        const user = await getUserByEmail(email);
        console.log("Usuário encontrado:", user);

        if (!user) {
            console.log("Usuário não encontrado.");
            return res.status(400).json({ message: "E-mail ou senha inválidos!" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Senha corresponde:", passwordMatch);

        if (!passwordMatch) {
            console.log("Senha incorreta.");
            return res.status(400).json({ message: "E-mail ou senha inválidos!" });
        }

        const token = jwt.sign({ id: user.id }, "secreta-chave-jwt", { expiresIn: '1h' });
        console.log("Token gerado:", token);

     
        return res.status(200).json({ 
            message: "Login bem-sucedido!", 
            token,
            user: { name: user.name} 
        });

    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).json({ message: "Erro ao realizar login." });
    }
};
