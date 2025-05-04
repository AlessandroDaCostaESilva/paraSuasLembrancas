import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; // Importa o Header
import { listarCarrinho, calcularTotalDoCarrinho } from '../services/api';
import '../css/cart.css';

const UserCartPage = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [userName, setUserName] = useState(""); 
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Captura o nome e email do usuário do localStorage
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    console.log("Nome do usuário recuperado:", storedName); // Confirma o nome recuperado
    console.log("Email do usuário recuperado:", storedEmail); // Confirma o email recuperado

    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);

    // Função para carregar os itens do carrinho
    const carregarCarrinho = async () => {
      const usuarioId = localStorage.getItem("userId"); // Recupera o ID do usuário
      console.log("ID do usuário recuperado:", usuarioId); // Confirma o ID recuperado
      try {
        const itens = await listarCarrinho(usuarioId);
        setCarrinho(itens); 
        const valorTotal = await calcularTotalDoCarrinho(usuarioId);
        setTotal(valorTotal); 
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
      }
    };

    carregarCarrinho(); // Chama a função ao montar o componente
  }, []); // Apenas uma vez, ao montar o componente

  return (
    <>
      {/* Encapsula o Header e a página dentro de um fragmento */}
      <Header />
      <div className="user-cart-page">
        <h1>Detalhes da Compra</h1>
        {/* todas as informacoes q foram configuradas nos usuarios */}
        <h2>Bem-vindo, {userName || "Visitante"}!</h2>
        <h3>Email: {userEmail || "Não informado"}</h3>

        
        <div>
          <h3>Produtos Comprados:</h3>
          {carrinho.length > 0 ? (
            <ul>
              {carrinho.map((item) => (
                <li key={item.id}>
                  <strong>{item.produto.nome}</strong>
                  <p>Descrição: {item.produto.descricao}</p>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Preço Unitário: R${item.produto.preco.toFixed(2)}</p>
                  <p>Subtotal: R${(item.produto.preco * item.quantidade).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>O carrinho está vazio.</p>
          )}
        </div>

        {/* Exibe o total da compra */}
        <h3>Total da Compra: R${total.toFixed(2)}</h3>
      </div>
    </>
  );
};

export default UserCartPage;
