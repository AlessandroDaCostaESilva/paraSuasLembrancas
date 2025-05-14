import express from 'express';
import {
  createProductController,
  createManyProductsController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  filterProductsController
} from '../controllers/productController.js';

const router = express.Router();

// Filtrar produtos por preço e descrição — precisa vir antes de `/:id`
router.get('/produtos/filtro/search', filterProductsController);  // Adicionada a barra antes de 'produtos'

// Obter todos os produtos
router.get('/produtos', getAllProductsController);  // Adicionada a barra antes de 'produtos'

// Obter produto por ID
router.get('/produtos/:id', getProductByIdController);  // Adicionada a barra antes de 'produtos'

// Criar um único produto
router.post('/produtos', createProductController);  // Adicionada a barra antes de 'produtos'

// Criar múltiplos produtos
router.post('/produtos/many', createManyProductsController);  // Adicionada a barra antes de 'produtos'

// Atualizar produto por ID
router.put('/produtos/:id', updateProductController);  // Adicionada a barra antes de 'produtos'

// Deletar produto por ID
router.delete('/produtos/:id', deleteProductController);  // Adicionada a barra antes de 'produtos'

export default router;