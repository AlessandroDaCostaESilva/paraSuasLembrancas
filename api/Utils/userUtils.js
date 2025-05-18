import prisma from '../config/prisma.js';

// Cria usuário (sem carrinho por padrão)
export const createUser = async (data) => {
  return await prisma.user.create({ data });
};

// Busca por e-mail (útil para login/autenticação)
export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true
    }
  });
};

// Busca por ID (garante conversão para número)
export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) }
  });
};

// Atualiza os dados de um usuário
export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data
  });
};

// Deleta um usuário
export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) }
  });
};

// Lista todos os usuários (com filtros opcionais)
export const getAllUsers = async (filter) => {
  return await prisma.user.findMany({ where: filter });
};
