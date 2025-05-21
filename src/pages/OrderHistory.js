import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';
import '../css/orders.css';

const OrderHistory = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avaliacao, setAvaliacao] = useState(5); // Estado inicial: 5 estrelas

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const usuarioId = localStorage.getItem('userId');
        // Ajuste na URL para bater com backend:
        const response = await api.get(`/pedidos/usuario/${usuarioId}`);
        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

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
                  <span className={`status ${pedido.status}`}>{pedido.status}</span>
                  {/* Usar createdAt, que provavelmente é o nome correto no backend */}
                  <span className="data">{new Date(pedido.createdAt).toLocaleDateString()}</span>
                  <span className="total">Total: R${pedido.total.toFixed(2)}</span>
                </div>

                <div className="itens-pedido">
                  <h3>Produtos:</h3>
                  <ul>
                    {pedido.itens.map(item => (
                      <li key={item.id}>
                        <div>
                          <h4>{item.produto.nome}</h4>
                          <p>Quantidade: {item.quantidade}</p>
                          <p>Preço unitário: R${item.precoUnitario.toFixed(2)}</p>
                          <select
                            value={avaliacao}
                            onChange={(e) => setAvaliacao(Number(e.target.value))}
                          >
                            <option value={1}>1 Estrela</option>
                            <option value={2}>2 Estrelas</option>
                            <option value={3}>3 Estrelas</option>
                            <option value={4}>4 Estrelas</option>
                            <option value={5}>5 Estrelas</option>
                          </select>
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
