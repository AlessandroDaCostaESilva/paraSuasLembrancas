import prisma from '../config/prisma.js';

export const addToCart = async (data) => {
  return await prisma.carrinho.create({ data });
};

export const getCartByUserId = async (usuarioId) => {
  return await prisma.carrinho.findMany({
    where: { usuarioId: parseInt(usuarioId) },
    include: { produto: true },
  });
};

export const updateCartItem = async (id, quantidade) => {
  return await prisma.carrinho.update({
    where: { id: parseInt(id) },
    data: { quantidade },
  });
};

export const removeFromCart = async (id) => {
  return await prisma.carrinho.delete({
    where: { id: parseInt(id) },
  });
};

export const calculateCartTotal = async (usuarioId) => {
  const carrinho = await prisma.carrinho.findMany({
    where: { usuarioId: parseInt(usuarioId) },
    include: { produto: true },
  });

  return carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);
};
