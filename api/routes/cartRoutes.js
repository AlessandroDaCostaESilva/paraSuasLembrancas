
import express from 'express';
import {
  addToCartController,
  getCartController,
  updateCartItemController,
  removeFromCartController,
  getCartTotalController
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/carrinho', addToCartController);
router.get('/carrinho/:usuarioId', getCartController);
router.put('/carrinho/:id', updateCartItemController);
router.delete('/carrinho/:id', removeFromCartController);
router.get('/carrinho/total/:usuarioId', getCartTotalController);

export default router;
























// import express from "express";
// import { PrismaClient } from "@prisma/client";

// const router = express.Router();
// const prisma = new PrismaClient();

// // Adicionar produto ao carrinho


// router.post("/carrinho", async (req, res) => {
//   const { usuarioId, produtoId, quantidade } = req.body;

//   console.log("Recebendo dados no backend:", { usuarioId, produtoId, quantidade });

//   try {
//       const produtoNoCarrinho = await prisma.carrinho.create({
//           data: {
//               usuarioId: parseInt(usuarioId, 10), 
//               produtoId: parseInt(produtoId, 10),
//               quantidade,
//           },
//       });
//       res.status(201).json(produtoNoCarrinho);
//   } catch (error) {
//       console.error("Erro ao adicionar produto ao carrinho:", {
//           mensagem: error.message,
//           detalhes: error.meta,
//       });
//       res.status(500).json({ error: "Erro ao adicionar produto ao carrinho." });
//   }
// });


// // mostrar produtos do carrinho
// router.get("/carrinho/:usuarioId", async (req, res) => {
//   const { usuarioId } = req.params;

//   try {
//     const carrinho = await prisma.carrinho.findMany({
//       where: { usuarioId: parseInt(usuarioId) },
//       include: { produto: true },
//     });
//     res.status(200).json(carrinho);
//   } catch (error) {
//     console.error("Erro ao listar carrinho:", error);
//     res.status(500).json({ error: "Erro ao listar carrinho." });
//   }
// });

// // Atualizar quantidade de um produto no carrinho
// router.put("/carrinho/:id", async (req, res) => {
//   const { id } = req.params;
//   const { quantidade } = req.body;

//   try {
//     const carrinhoAtualizado = await prisma.carrinho.update({
//       where: { id: parseInt(id) },
//       data: { quantidade },
//     });
//     res.status(200).json(carrinhoAtualizado);
//   } catch (error) {
//     console.error("Erro ao atualizar produto no carrinho:", error);
//     res.status(500).json({ error: "Erro ao atualizar produto no carrinho." });
//   }
// });

// // Remover produto do carrinho
// router.delete("/carrinho/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     await prisma.carrinho.delete({
//       where: { id: parseInt(id) },
//     });
//     res.status(200).json({ message: "Produto removido do carrinho com sucesso!" });
//   } catch (error) {
//     console.error("Erro ao remover produto do carrinho:", error);
//     res.status(500).json({ error: "Erro ao remover produto do carrinho." });
//   }
// });

// // Calcular total do carrinho
// router.get("/carrinho/total/:usuarioId", async (req, res) => {
//   const { usuarioId } = req.params;

//   try {
//     const carrinho = await prisma.carrinho.findMany({
//       where: { usuarioId: parseInt(usuarioId) },
//       include: { produto: true },
//     });

//     const total = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

//     res.status(200).json({ total });
//   } catch (error) {
//     console.error("Erro ao calcular total do carrinho:", error);
//     res.status(500).json({ error: "Erro ao calcular total do carrinho." });
//   }
// });

// export default router;
