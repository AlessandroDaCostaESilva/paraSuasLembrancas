import prisma from '../config/prisma.js';

export const createMessage = async (data) => {
    return await prisma.message.create({ data });
};

export const getAllMessages = async () => {
    return await prisma.message.findMany({
        include: { user: true },
    });
};

export const getMessageById = async (id) => {
    return await prisma.message.findUnique({
        where: { id: parseInt(id) },
        include: {
            user: {
                select: {
                    id: true,
                    name: true 
                }
            }
        },
    });
};
export const getAllMessagesByUserId = (userId) => {
    return prisma.message.findMany({
        where: {
            userId: parseInt(userId),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });
};
export const deleteMessage = async (id) => {
    return await prisma.message.delete({
        where: { id: parseInt(id) },
    });
};
export const updateMessage = async (id, content) => {
    return await prisma.message.update({
        where: { id: parseInt(id) },
        data: { content },
    });
};

export const createMessageHistory = async ({ originalId, content, action, editedById }) => {
    return await prisma.messageHistory.create({
        data: {
            originalId,
            content,
            action,
            editedById
        }
    });
};