import {
  createProduct,
  createManyProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProducts
} from '../Utils/productUtils.js';

// Criar um único produto
export const createProductController = async (req, res) => {
  try {
    console.log('Iniciando criação de produto');
    const { nome, descricao, preco } = req.body;
    console.log('Dados recebidos para criação:', { nome, descricao, preco });
    const imagemPath = req.file ? `/uploads/${req.file.filename}` : null; // Caminho da imagem
    console.log('Imagem salva em:', imagemPath);

    const produto = await createProduct({
      nome,
      descricao,
      preco: parseFloat(preco),
      imagem: imagemPath, // Salva o caminho da imagem
    });

    console.log('Produto criado com sucesso:', produto);
    res.status(201).json(produto);
  } catch (error) {
    console.error('Erro ao criar produto com imagem:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Criar múltiplos produtos
export const createManyProductsController = async (req, res) => {
  try {
    console.log('Iniciando criação de múltiplos produtos');
    const produtos = await createManyProducts(req.body);
    console.log('Múltiplos produtos criados com sucesso:', produtos);
    res.status(201).json(produtos);
  } catch (error) {
    console.error('Erro ao criar múltiplos produtos:', error);
    res.status(500).json({ error: 'Erro ao criar múltiplos produtos', detalhes: error.message });
  }
};

// Obter todos os produtos
export const getAllProductsController = async (req, res) => {
  try {
    console.log('Buscando todos os produtos');
    const produtos = await getAllProducts();
    console.log('Produtos encontrados:', produtos);
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos', detalhes: error.message });
  }
};

// Obter produto por ID
export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Buscando produto com ID:', id);

    // Garantir que o ID seja um número inteiro
    const idInt = parseInt(id);
    console.log('ID convertido para inteiro:', idInt);

    // Verificar se o ID não é válido
    if (isNaN(idInt)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const produto = await getProductById(idInt); // Passar o ID convertido
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    console.log('Produto encontrado:', produto);
    res.status(200).json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar produto por ID', detalhes: error.message });
  }
};

// Atualizar produto por ID
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Iniciando atualização do produto com ID:', id);
    console.log('Dados para atualização:', req.body);

    const produtoAtualizado = await updateProduct(id, req.body);
    console.log('Produto atualizado com sucesso:', produtoAtualizado);
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto', detalhes: error.message });
  }
};

// Deletar produto por ID
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Iniciando deleção do produto com ID:', id);
    await deleteProduct(id);
    console.log('Produto deletado com sucesso');
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto', detalhes: error.message });
  }
};

// Filtrar produtos por critérios
export const filterProductsController = async (req, res) => {
  try {
    console.log('Iniciando filtro de produtos');
    const { precoMin, precoMax, descricao } = req.query;
    console.log('Filtros aplicados:', { precoMin, precoMax, descricao });

    const produtos = await filterProducts({ precoMin, precoMax, descricao });
    console.log('Produtos filtrados:', produtos);
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao filtrar produtos:', error);
    res.status(500).json({ error: 'Erro ao filtrar produtos', detalhes: error.message });
  }
};
