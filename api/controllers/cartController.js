import {
  addToCart,
  getCartByUserId,
  updateCartItem,
  removeFromCart,
  calculateCartTotal
} from '../Utils/cartUtils.js';

export const addToCartController = async (req, res) => {
  const { usuarioId, produtoId, quantidade } = req.body;

  try {
    // Verifica se o produto já está no carrinho
    const carrinho = await getCartByUserId(usuarioId);
    const produtoExistente = carrinho.find(item => item.produtoId === produtoId);

    if (produtoExistente) {
      const atualizado = await updateCartItem(produtoExistente.id, produtoExistente.quantidade + quantidade);
      return res.status(200).json(atualizado);
    }

    // Se não existe, cria novo
    const novo = await addToCart({
      usuarioId: parseInt(usuarioId),
      produtoId: parseInt(produtoId),
      quantidade,
    });

    res.status(201).json(novo);
  } catch (error) {
    console.error("Erro ao adicionar produto ao carrinho:", error);
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
