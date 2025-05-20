import {
  createPedido,
  getPedidosByUsuario,
  getPedidoById,
  updatePedidoStatus
} from '../Utils/orderUtils.js';

/* ─────────────── CRIAR PEDIDO ─────────────── */
export const criarPedidoController = async (req, res) => {
  try {
    const usuarioId = Number(req.body.usuarioId); // garante que seja número

    
    const pedido = await createPedido(usuarioId);
    
    console.log("✅ Pedido criado com sucesso:", pedido);
    return res.status(201).json(pedido);
  } catch (err) {
    if (err.message === 'CARRINHO_VAZIO') {
      console.warn("⚠️ Carrinho vazio para usuário:", usuarioId);
      return res.status(400).json({ message: 'Carrinho vazio.' });
    }
    console.error('❌ Erro ao criar pedido:', err);
    return res.status(500).json({ message: 'Erro ao criar pedido.' });
  }
};

/* ─────────────── LISTAR POR USUÁRIO ────────── */
export const listarPedidosController = async (req, res) => {
  try {
    const usuarioId = Number(req.params.usuarioId);
    console.log("🔍 Listando pedidos do usuário:", usuarioId);
    
    const pedidos = await getPedidosByUsuario(usuarioId);
    
    console.log("📋 Pedidos encontrados:", pedidos);
    return res.status(200).json(pedidos);
  } catch (err) {
    console.error('❌ Erro ao listar pedidos:', err);
    return res.status(500).json({ message: 'Erro ao listar pedidos.' });
  }
};

/* ─────────────── DETALHE DE UM PEDIDO ──────── */
export const getPedidoByIdController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log("🔍 Buscando pedido por ID:", id);
    
    const pedido = await getPedidoById(id);
    
    if (!pedido) {
      console.warn("⚠️ Pedido não encontrado:", id);
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }
    
    console.log("📦 Pedido encontrado:", pedido);
    return res.status(200).json(pedido);
  } catch (err) {
    console.error('❌ Erro ao buscar pedido:', err);
    return res.status(500).json({ message: 'Erro ao buscar pedido.' });
  }
};

/* ─────────────── ALTERAR STATUS ────────────── */
export const updatePedidoStatusController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    
    console.log(`🔄 Atualizando status do pedido ${id} para:`, status);
    
    const pedido = await updatePedidoStatus(id, status);
    
    console.log("✅ Status atualizado:", pedido);
    return res.status(200).json(pedido);
  } catch (err) {
    console.error('❌ Erro ao atualizar status:', err);
    return res.status(500).json({ message: 'Erro ao atualizar status.' });
  }
};
