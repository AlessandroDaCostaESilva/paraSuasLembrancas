import { 
    createMessage, 
    getAllMessages, 
    getMessageById,
    updateMessage, 
    deleteMessage,
    getAllMessagesByUserId,
    createMessageHistory,
} from '../Utils/messageUtils.js';


import { getUserById } from '../Utils/userUtils.js';
import prisma from '../config/prisma.js';

// Criar mensagem
export const createMessageController = async (req, res) => {
    try {
        const { content, userId } = req.body;

        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        const newMessage = await createMessage({ content, userId });

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Erro ao criar mensagem:", error);
        res.status(500).json({ message: "Erro ao criar mensagem." });
    }
};

// Buscar todas as mensagens
export const getAllMessagesController = async (req, res) => {
    try {
        const messages = await getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        res.status(500).json({ message: "Erro ao buscar mensagens." });
    }
};

// Buscar mensagem por ID
export const getMessageByIdController = async (req, res) => {
    try {
        const message = await getMessageById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: "Mensagem não encontrada!" });
        }
        res.status(200).json(message);
    } catch (error) {
        console.error("Erro ao buscar mensagem:", error);
        res.status(500).json({ message: "Erro ao buscar mensagem." });
    }
};

// Deletar mensagem com verificação de dono
export const deleteMessageController = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const message = await getMessageById(id);
        if (!message) {
            return res.status(404).json({ message: "Mensagem não encontrada!" });
        }

        if (message.userId !== parseInt(userId)) {
            return res.status(403).json({ message: "Você não tem permissão para deletar essa mensagem." });
        }

        // Salva o histórico antes de deletar
        await createMessageHistory({
            originalId: message.id,
            content: message.content,
            action: "deleted",
            editedById: parseInt(userId)
        });

        await deleteMessage(id);
        res.status(200).json({ message: "Mensagem deletada com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar mensagem:", error);
        res.status(500).json({ message: "Erro ao deletar mensagem." });
    }
};

// Buscar mensagem de um usuário específico
export const getUserMessageByIdController = async (req, res) => {
    try {
        const { messageId, userId } = req.params;

        const message = await prisma.message.findFirst({
            where: {
                id: parseInt(messageId),
                userId: parseInt(userId),
            },
            include: { user: true },
        });

        if (!message) {
            return res.status(404).json({ message: "Mensagem não encontrada para este usuário." });
        }

        res.status(200).json(message);

    } catch (error) {
        console.error("Erro ao buscar mensagem do usuário:", error);
        res.status(500).json({ message: "Erro ao buscar mensagem do usuário." });
    }
};

// Buscar o usuário dono de uma mensagem
export const getUserByMessageIdController = async (req, res) => {
    try {
        const { messageId } = req.params;

        const message = await prisma.message.findUnique({
            where: { id: parseInt(messageId) },
            include: { user: true }
        });

        if (!message) {
            return res.status(404).json({ message: "Mensagem não encontrada." });
        }

        res.status(200).json({ user: message.user });

    } catch (error) {
        console.error("Erro ao buscar usuário pela mensagem:", error);
        res.status(500).json({ message: "Erro ao buscar usuário." });
    }
};

// Atualizar mensagem
export const updateMessageController = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, userId } = req.body;

        const message = await getMessageById(id);
        if (!message) {
            return res.status(404).json({ message: "Mensagem não encontrada!" });
        }

        if (message.userId !== parseInt(userId)) {
            return res.status(403).json({ message: "Você não tem permissão para editar essa mensagem." });
        }

        // Salva o histórico antes de editar
        await createMessageHistory({
            originalId: message.id,
            content: message.content,
            action: "edited",
            editedById: parseInt(userId)
        });

        const updated = await updateMessage(id, content);

        res.status(200).json({ message: "Mensagem atualizada com sucesso!", updated });
    } catch (error) {
        console.error("Erro ao atualizar mensagem:", error);
        res.status(500).json({ message: "Erro ao atualizar mensagem." });
    }
};
export const deleteMessageControllerByAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await getMessageById(id);
        if (!message) {
            return res.status(404).json({ message: "Mensagem não encontrada!" });
        }

        await deleteMessage(id);
        res.status(200).json({ message: "Mensagem deletada com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar mensagem:", error);
        res.status(500).json({ message: "Erro ao deletar mensagem." });
    }
};
export const getMessagesByUserIdController = async (req, res) => {
    try {
        const { userId } = req.params;

        // Chama a função que busca as mensagens do usuário
        const messages = await getAllMessagesByUserId(userId);

        if (messages.length === 0) {
            return res.status(404).json({ message: 'Nenhuma mensagem encontrada para este usuário.' });
        }

        return res.status(200).json(messages);
    } catch (error) {
        console.error("Erro ao buscar mensagens do usuário:", error);
        return res.status(500).json({ message: 'Erro ao buscar mensagens do usuário.' });
    }
};