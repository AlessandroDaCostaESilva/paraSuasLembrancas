import {
  addToCart,
  getCartByUserId,
  updateCartItem,
  removeFromCart,
  calculateCartTotal
} from '../Utils/cartUtils.js';

export const addToCartController = async (req, res) => {
  // ❗ Adiciona isso aqui para pegar os dados do body:
  const { usuarioId, produtoId, quantidade } = req.body;

  try {
    // Verifica se o produto já está no carrinho do usuário
    const produtoExistente = await prisma.carrinho.findFirst({
      where: {
        usuarioId: parseInt(usuarioId, 10),
        produtoId: parseInt(produtoId, 10),
      },
    });

    if (produtoExistente) {
      // Atualiza a quantidade somando a anterior
      const carrinhoAtualizado = await prisma.carrinho.update({
        where: { id: produtoExistente.id },
        data: {
          quantidade: produtoExistente.quantidade + quantidade,
        },
      });

      return res.status(200).json(carrinhoAtualizado);
    }

    // Produto ainda não está no carrinho, cria novo
    const novoProdutoNoCarrinho = await prisma.carrinho.create({
      data: {
        usuarioId: parseInt(usuarioId, 10),
        produtoId: parseInt(produtoId, 10),
        quantidade,
      },
    });

    res.status(201).json(novoProdutoNoCarrinho);
  } catch (error) {
    console.error("Erro ao adicionar produto ao carrinho:", {
      mensagem: error.message,
      detalhes: error.meta,
    });
    res.status(500).json({ error: "Erro ao adicionar produto ao carrinho." });
  }
};
export const getCartController = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const carrinho = await getCartByUserId(usuarioId);
    res.status(200).json(carrinho);
  } catch (error) {
    console.error("Erro ao obter carrinho:", error);
    res.status(500).json({ error: 'Erro ao obter carrinho.' });
  }
};

export const updateCartItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    const atualizado = await updateCartItem(id, quantidade);
    res.status(200).json(atualizado);
  } catch (error) {
    console.error("Erro ao atualizar item do carrinho:", error);
    res.status(500).json({ error: 'Erro ao atualizar item do carrinho.' });
  }
};

export const removeFromCartController = async (req, res) => {
  try {
    const { id } = req.params;
    await removeFromCart(id);
    res.status(200).json({ message: "Item removido do carrinho com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    res.status(500).json({ error: 'Erro ao remover item do carrinho.' });
  }
};

export const getCartTotalController = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const total = await calculateCartTotal(usuarioId);
    res.status(200).json({ total });
  } catch (error) {
    console.error("Erro ao calcular total:", error);
    res.status(500).json({ error: 'Erro ao calcular total do carrinho.' });
  }
};
