import prisma from '../config/prisma.js';

export const createUser = async (data) => {
    return await prisma.user.create({ data });
};

export const getUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
};

export const getUserById = async (id) => {
    return await prisma.user.findUnique({ where: { id: parseInt(id) } });
};

export const updateUser = async (id, data) => {
    return await prisma.user.update({ where: { id: parseInt(id) }, data });
};

export const deleteUser = async (id) => {
    return await prisma.user.delete({ where: { id: parseInt(id) } });
};

export const getAllUsers = async (filter) => {
    return await prisma.user.findMany({ where: filter });
};
