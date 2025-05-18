import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000' 
});

export default api;

// carrinho ou pagina do usuario

export const finalizarPedido = async (usuarioId) => {
    try {
      // O backend espera POST /pedidos com { usuarioId } no body
      const response = await api.post('/pedidos', { usuarioId });
      return response.data;
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error.response?.data || error.message);
      throw error;
    }
};
// Adicionar produto
export const adicionarAoCarrinho = async (usuarioId, produtoId, quantidade) => {
    try {
        const response = await api.post('/carrinho', { usuarioId, produtoId, quantidade });
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error.response?.data || error.message);
        throw error;
    }
};

export const atualizarQuantidadeItem = async (itemId, quantidade) => {
    try {
      const response = await api.put(`/carrinho/${itemId}`, { quantidade });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error.response?.data || error.message);
      throw error;
    }
  };
// Listar produtos
export const listarCarrinho = async (usuarioId) => {
    try {
        const response = await api.get(`/carrinho/${usuarioId}`);
        return response.data; 
    } catch (error) {
        console.error("Erro ao listar carrinho:", error);
        throw error;
    }
};

// Atualizar quantidade de um produto no carrinho
export const atualizarQuantidadeNoCarrinho = async (id, quantidade) => {
    try {
        const response = await api.put(`/carrinho/${id}`, { quantidade });
        return response.data; 
    } catch (error) {
        console.error("Erro ao atualizar quantidade no carrinho:", error);
        throw error;
    }
};

// Remover produto do carrinho
export const removerProdutoDoCarrinho = async (id) => {
    try {
        const response = await api.delete(`/carrinho/${id}`);
        return response.data; 
    } catch (error) {
        console.error("Erro ao remover produto do carrinho:", error);
        throw error;
    }
};

// Calcular total do carrinho
export const calcularTotalDoCarrinho = async (usuarioId) => {
    try {
        const response = await api.get(`/carrinho/total/${usuarioId}`);
        return response.data.total; 
    } catch (error) {
        console.error("Erro ao calcular total do carrinho:", error);
        throw error;
    }
};


export const getAllProducts = async () => {
  const response = await api.get('/produtos');
  return response.data;
};

export const listarPedidos = async (usuarioId) => {
    try {
      const response = await api.get(`/pedidos/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar pedidos:", error.response?.data || error.message);
      throw error;
    }
  };