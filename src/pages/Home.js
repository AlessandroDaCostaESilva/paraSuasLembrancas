import { useEffect, useState } from "react";
import Header from "../components/Header";
import '../css/home.css';
import CardsProducts from "../components/CardsProducts";
import { adicionarAoCarrinho, getAllProducts } from "../services/api"; // função que busca os produtos da API

const handleAdicionarCarrinho = async (produto) => {
  let usuarioId = localStorage.getItem("userId");
  if (!usuarioId) {
    alert("Erro: usuário não encontrado. Por favor, faça login novamente!");
    return;
  }

  usuarioId = parseInt(usuarioId, 10);

  try {
    await adicionarAoCarrinho(usuarioId, produto.id, 1);
    alert(`O produto "${produto.nome}" foi adicionado ao seu histórico!`);
  } catch (error) {
    console.error("Erro ao adicionar ao carrinho:", error);
    alert("Erro ao adicionar produto ao carrinho.");
  }
};

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await getAllProducts();
        setProdutos(res);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };
    fetchProdutos();
  }, []);

  // Separar os produtos por categoria
  const produtosMiriti = produtos.filter(p => p.descricao.toLowerCase().includes("miriti"));
  const produtosMarajoara = produtos.filter(p => p.descricao.toLowerCase().includes("marajoara"));
  const produtosCheiros = produtos.filter(p => p.descricao.toLowerCase().includes("cheiros"));

  return (
    <>
      <Header />
      <main className='main'>
        <section className="exibicaoPrincipal">
          <div className="apresentacaoEsquerda">
            <h1 className="textInfo titulo">NÃO SAIA DO PARÁ.</h1>
            <p className="textInfo">SEM LEVAR UMA LEMBRANÇA COM VOCÊ...</p>
            <span className="btnScroll textInfo" id="goProduct">IR ÀS COMPRAS</span>
          </div>
        </section>

        <div className="products">
          <h2 className="titleProduct">
            <span className="linhaMarajoara">CATALOGO DE PRODUTOS </span>
          </h2>
        </div>

        <section className="cardsLayout">
          <h3>MIRITI</h3>
          <ul className="cartoesOrg">
            {produtosMiriti.map((produto) => (
              <CardsProducts
                key={produto.id}
                imagem={`http://localhost:5000${produto.imagem}`}
                item={produto.nome}
                descricaoItem={produto.descricao}
                onClick={() => handleAdicionarCarrinho(produto)}
              />
            ))}
          </ul>

          <h3>MARAJOARA</h3>
          <ul className="cartoesOrg">
            {produtosMarajoara.map((produto) => (
              <CardsProducts
                key={produto.id}
                imagem={`http://localhost:5000${produto.imagem}`}
                item={produto.nome}
                descricaoItem={produto.descricao}
                onClick={() => handleAdicionarCarrinho(produto)}
              />
            ))}
          </ul>

          <h3>CHEIROS DO PARÁ</h3>
          <ul className="cartoesOrg">
            {produtosCheiros.map((produto) => (
              <CardsProducts
                key={produto.id}
                imagem={`http://localhost:5000${produto.imagem}`}
                item={produto.nome}
                descricaoItem={produto.descricao}
                onClick={() => handleAdicionarCarrinho(produto)}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Home;
