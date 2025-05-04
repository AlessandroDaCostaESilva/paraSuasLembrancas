import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Adicionar  produtos
router.post("/produtos", async (req, res) => {
  const produtos = req.body; 

 
  if (!Array.isArray(produtos)) {
    return res.status(400).json({ error: "A requisição deve conter um array de produtos." });
  }

  try {
    const novosProdutos = await prisma.produto.createMany({
      data: produtos, 
    });
    res.status(201).json({ message: "Produtos adicionados com sucesso!", count: novosProdutos.count });
  } catch (error) {
    console.error("Erro ao adicionar produtos:", error);
    res.status(500).json({ error: "Erro ao adicionar os produtos." });
  }
});


// Mostrar os produtos
router.get("/produtos", async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ error: "Erro ao listar os produtos." });
  }
});

// Buscar produto por ID
router.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.status(200).json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: "Erro ao buscar o produto." });
  }
});

// Atualizar produto 
router.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, imagem } = req.body;

  try {
    const produtoAtualizado = await prisma.produto.update({
      where: { id: parseInt(id) },
      data: { nome, descricao, preco, imagem },
    });

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro ao atualizar o produto." });
  }
});

// Deletar produto 
router.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.produto.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Produto deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar o produto." });
  }
});

// Filtrar produtos por preço e descrição
router.get("/produtos/filter", async (req, res) => {
  const { precoMin, precoMax, descricao } = req.query;

  try {
    const produtosFiltrados = await prisma.produto.findMany({
      where: {
        preco: {
          gte: precoMin ? parseFloat(precoMin) : undefined,
          lte: precoMax ? parseFloat(precoMax) : undefined,
        },
        descricao: descricao ? { contains: descricao } : undefined,
      },
    });

    res.status(200).json(produtosFiltrados);
  } catch (error) {
    console.error("Erro ao filtrar produtos:", error);
    res.status(500).json({ error: "Erro ao filtrar os produtos." });
  }
});

export default router;
