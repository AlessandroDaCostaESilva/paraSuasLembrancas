// utils/productUtils.js

import prisma from '../config/prisma.js';

// Criar um único produto
export const createProduct = async (data) => {
  return await prisma.produto.create({ data });
};

// Criar múltiplos produtos
export const createManyProducts = async (produtos) => {
  return await prisma.produto.createMany({
    data: produtos,
    skipDuplicates: true, // Ignora duplicatas com base em campos únicos
  });
};

// Obter todos os produtos
export const getAllProducts = async () => {
  return await prisma.produto.findMany();
};

// Obter produto por ID
export const getProductById = async (id) => {
  return await prisma.produto.findUnique({
    where: { id: parseInt(id) },
  });
};

// Atualizar produto por ID
export const updateProduct = async (id, data) => {
  return await prisma.produto.update({
    where: { id: parseInt(id) },
    data,
  });
};

// Deletar produto por ID
export const deleteProduct = async (id) => {
  return await prisma.produto.delete({
    where: { id: parseInt(id) },
  });
};

// Filtrar produtos por preço mínimo, máximo e descrição
export const filterProducts = async ({ precoMin, precoMax, descricao }) => {
  return await prisma.produto.findMany({
    where: {
      preco: {
        gte: precoMin ? parseFloat(precoMin) : undefined,
        lte: precoMax ? parseFloat(precoMax) : undefined,
      },
      descricao: descricao ? { contains: descricao } : undefined,
    },
  });
};
