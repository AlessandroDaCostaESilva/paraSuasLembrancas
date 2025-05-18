import prisma from '../config/prisma.js';

/* ─────────────── CRIA PEDIDO + ITENS ─────────────── */
export const createPedido = async (usuarioId) => {
  // converte para número (redundante se controller já converte, mas deixa seguro)
  usuarioId = Number(usuarioId);

  const carrinho = await prisma.carrinho.findMany({
    where: { usuarioId },
    include: { produto: true }
  });

  if (carrinho.length === 0) throw new Error('CARRINHO_VAZIO');

  // Calcula total
  const total = carrinho.reduce(
    (sum, item) => sum + item.produto.preco * item.quantidade,
    0
  );

  // Cria pedido com itens
  const pedido = await prisma.pedido.create({
    data: {
      usuarioId,
      total,
      status: 'pendente',
      itens: {
        create: carrinho.map(({ produtoId, quantidade, produto }) => ({
          produtoId,
          quantidade,
          precoUnitario: produto.preco
        }))
      }
    },
    include: { itens: { include: { produto: true } } }
  });

  // Limpa carrinho
  await prisma.carrinho.deleteMany({ where: { usuarioId } });

  return pedido;
};

/* ─────────────────── LISTAR POR USUÁRIO ───────────── */
export const getPedidosByUsuario = async (usuarioId) => {
  usuarioId = Number(usuarioId);

  return await prisma.pedido.findMany({
    where: { usuarioId },
    include: {
      itens: { include: { produto: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
};

/* ──────────────── OBTÉM PEDIDO ESPECÍFICO ─────────── */
export const getPedidoById = async (id) => {
  id = Number(id);

  return await prisma.pedido.findUnique({
    where: { id },
    include: {
      itens: { include: { produto: true } },
      usuario: { select: { id: true, name: true, email: true } }
    }
  });
};

/* ─────────────── ALTERA STATUS (ex.: pago, enviado) ─ */
export const updatePedidoStatus = async (id, status) => {
  id = Number(id);

  return await prisma.pedido.update({
    where: { id },
    data: { status }
  });
};
