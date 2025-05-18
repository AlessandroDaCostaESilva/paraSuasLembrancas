import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { 
    listarCarrinho, 
    calcularTotalDoCarrinho,
    finalizarPedido,
    removerProdutoDoCarrinho,
    atualizarQuantidadeItem
} from '../services/api';
import '../css/cart.css';
import { useNavigate } from 'react-router-dom';

const UserCartPage = () => {
    const [carrinho, setCarrinho] = useState([]);
    const [total, setTotal] = useState(0);
    const [finalizando, setFinalizando] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const carregarCarrinho = useCallback(async () => {
        try {
            const itens = await listarCarrinho(id);
            setCarrinho(itens);
            const valorTotal = await calcularTotalDoCarrinho(id);
            setTotal(valorTotal);
        } catch (error) {
            console.error('Erro ao carregar o carrinho:', error);
        }
    }, [id]);

    const handleFinalizarCompra = async () => {
        try {
            setFinalizando(true);
            const usuarioId = localStorage.getItem("userId");
            
            if (!usuarioId) {
                throw new Error("Você precisa estar logado para finalizar a compra");
            }
        
            if (carrinho.length === 0) {
                throw new Error("Seu carrinho está vazio");
            }
            navigate('/pagamento', { 
                state: { 
                    total,
                    userId: usuarioId 
                } 
            });

        } catch (error) {
            console.error('Erro ao finalizar compra:', error);
            alert(`Erro: ${error.message}`);
        } finally {
            setFinalizando(false);
        }
    };

    const handleRemoverItem = async (itemId) => {
        try {
            await removerProdutoDoCarrinho(itemId);
            await carregarCarrinho();
        } catch (error) {
            console.error('Erro ao remover item:', error);
            alert('Erro ao remover item do carrinho');
        }
    };

    const atualizarQuantidade = async (itemId, novaQuantidade) => {
        if (novaQuantidade < 1) {
            await handleRemoverItem(itemId);
            return;
        }

        try {
            await atualizarQuantidadeItem(itemId, novaQuantidade);
            await carregarCarrinho();
        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
            alert('Erro ao atualizar quantidade');
        }
    };

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        if (!storedId || storedId !== id) {
            navigate('/login');
            return;
        }

        carregarCarrinho();
    }, [navigate, id, carregarCarrinho]);

    return (
        <>
            <Header />
            <div className="cart-container">
                <h1 className="cart-title">Carrinho</h1>
                
                <div className="cart-content">
                    <div className="cart-items">
                        {carrinho.length > 0 ? (
                            carrinho.map((item) => (
                                <div key={item.id} className="cart-item">
                                    
                                    <div className="item-details">
                                        <h3 className="item-name">{item.produto?.nome || 'Produto não disponível'}</h3>
                                        <p className="item-price">R$ {item.produto?.preco?.toFixed(2) || '0.00'}</p>
                                        
                                        <div className="item-actions">
                                            <button 
                                                className="remove-btn"
                                                onClick={() => handleRemoverItem(item.id)}
                                            >
                                                Remover
                                            </button>
                                            
                                            <div className="quantity-control">
                                                <button 
                                                    onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                                                    className="quantity-btn"
                                                >
                                                    -
                                                </button>
                                                <span className="quantity">{item.quantidade}</span>
                                                <button 
                                                    onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                                                    className="quantity-btn"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-cart">
                                <p>Seu carrinho está vazio</p>
                                <button 
                                    onClick={() => navigate('/')}
                                    className="continue-shopping"
                                >
                                    Continuar comprando
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {carrinho.length > 0 && (
                        <div className="order-summary">
                            <h2 className="summary-title">Resumo do Pedido</h2>
                            
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>R$ {total.toFixed(2)}</span>
                            </div>
                            
                            <div className="summary-row">
                                <span>Frete</span>
                                <span>Grátis</span>
                            </div>
                            
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>R$ {total.toFixed(2)}</span>
                            </div>
                            
                            <button
                                onClick={handleFinalizarCompra}
                                disabled={finalizando}
                                className="checkout-btn"
                            >
                                {finalizando ? 'Processando...' : 'Finalizar Compra'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserCartPage;