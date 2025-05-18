import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { listarPedidos } from '../services/api';
import '../css/orders.css';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarPedidos = async () => {
      const usuarioId = localStorage.getItem("userId");
      if (!usuarioId) {
        navigate('/login');
        return;
      }

      try {
        const pedidos = await listarPedidos(usuarioId);
        setPedidos(pedidos);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarPedidos();
  }, [navigate]);

  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <Header />
      <div className="order-history">
        <h1>Meus Pedidos</h1>
        
        {pedidos.length === 0 ? (
          <p>Nenhum pedido encontrado.</p>
        ) : (
          <div className="pedidos-list">
            {pedidos.map(pedido => (
              <div key={pedido.id} className="pedido-card">
                <div className="pedido-header">
                  <h2>Pedido #{pedido.id}</h2>
                  <span className={`status ${pedido.status.toLowerCase()}`}>
                    {pedido.status}
                  </span>
                  <span className="data">
                    {new Date(pedido.createdAt).toLocaleDateString()}
                  </span>
                  <span className="total">Total: R${pedido.total.toFixed(2)}</span>
                </div>
                
                <div className="itens-pedido">
                  <h3>Produtos:</h3>
                  <ul>
                    {pedido.itens.map(item => (
                      <li key={item.id}>
                        <div className="item-info">
                          <h4>{item.produto.nome}</h4>
                          <p>Quantidade: {item.quantidade}</p>
                          <p>Preço unitário: R${item.precoUnitario.toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;