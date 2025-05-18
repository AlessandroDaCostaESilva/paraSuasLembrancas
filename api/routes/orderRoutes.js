import express from 'express';
import {
  criarPedidoController,
  listarPedidosController,
  getPedidoByIdController,
  updatePedidoStatusController
} from '../controllers/orderController.js';

const router = express.Router();

/* rotas base: /pedidos */
router.post('/pedidos', criarPedidoController);                        // cria pedido a partir do carrinho
router.get('/pedidos/usuario/:usuarioId', listarPedidosController);   // lista todos de um usuário
router.get('/pedidos/:id', getPedidoByIdController);                  // detalhe do pedido
router.patch('/pedidos/:id/status', updatePedidoStatusController);    // muda status

export default router;