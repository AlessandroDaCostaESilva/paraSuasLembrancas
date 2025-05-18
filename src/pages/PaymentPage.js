import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { finalizarPedido } from '../services/api';
import '../css/payment.css';

const PaymentPage = () => {
    const location = useLocation();
    const { total, userId } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleFinalizarPagamento = async () => {
        try {
            setIsProcessing(true);
            
            // Validações básicas
            if (!userId) {
                throw new Error("Usuário não identificado");
            }

            if (paymentMethod === 'credit' || paymentMethod === 'debit') {
                if (!cardNumber || !cardName || !expiryDate || !cvv) {
                    throw new Error("Preencha todos os dados do cartão");
                }
            }

            // Processar o pagamento (aqui você integraria com sua API de pagamento)
            await finalizarPedido(userId);
            
            // Redirecionar para histórico com estado de sucesso
            navigate('/pedidos', { 
                state: { 
                    paymentSuccess: true,
                    paymentMethod,
                    total 
                } 
            });
        } catch (error) {
            console.error('Erro no pagamento:', error);
            alert(`Erro: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    // Se não tiver os dados necessários, redireciona
    if (!total || !userId) {
        navigate('/carrinho');
        return null;
    }

    return (
        <>
          <Header />
          <div className="payment-layout">
            <div className="payment-content-column">
              <div className="payment-methods">
                <h1>Pagamento</h1>
                <h2>Método de Pagamento</h2>
                
                <div className="method-options">
                  <button
                    className={`method-btn ${paymentMethod === 'credit' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('credit')}
                  >
                    Cartão de crédito
                  </button>
                  
                  <button
                    className={`method-btn ${paymentMethod === 'pix' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('pix')}
                  >
                    PIX
                  </button>
                </div>
      
                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>Número do cartão</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Validade</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          placeholder="•••"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Nome no cartão</label>
                      <input
                        type="text"
                        placeholder="Nome como no cartão"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'pix' && (
                  <div className="pix-info">
                    <p>Você será redirecionado para gerar o QR Code PIX após confirmar o pagamento.</p>
                  </div>
                )}
              </div>
              
              <div className="payment-summary">
                <h2>Resumo do Pedido</h2>
                
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                
                <div className="summary-item">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                
                <div className="summary-total">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                
                <button
                  className="pay-button"
                  onClick={handleFinalizarPagamento}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processando...' : 'Pagar'}
                </button>
              </div>
            </div>
            
            <div className="payment-image">
              <img src="https://th.bing.com/th/id/R.fabb222a475825b9d3d6d7cf034f793d?rik=%2fR5Cc4L34AGLOg&pid=ImgRaw&r=0" alt="Decoração de compra" />
            </div>
          </div>
        </>
      );
};

export default PaymentPage;