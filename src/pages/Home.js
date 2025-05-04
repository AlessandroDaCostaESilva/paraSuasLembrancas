import Header from "../components/Header"
import '../css/home.css'
import CardsProducts from "../components/CardsProducts"
import { adicionarAoCarrinho } from "../services/api";

const handleAdicionarCarrinho = async (produto) => {
    let usuarioId = localStorage.getItem("userId"); // Recupera o ID do usuário como string

    if (!usuarioId) {
        alert("Erro: usuário não encontrado. Por favor, faça login novamente!");
        console.error("UsuarioId não definido no localStorage");
        return;
    }

    // Converte `usuarioId` para número
    usuarioId = parseInt(usuarioId, 10);

    console.log("Dados verificados antes do envio:", { usuarioId, produtoId: produto.id, quantidade: 1 });

    try {
        const response = await adicionarAoCarrinho(usuarioId, produto.id, 1); // Envia como número
        console.log("Resposta do backend:", response);
        alert(`O produto "${produto.item}" foi adicionado ao seu Historico!`);
    } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        alert("Não foi possível adicionar o produto ao carrinho.");
    }
};


const Home = () => {
    
    return(
        <>
            <Header />
            <main className='main'>
            <section className="exibicaoPrincipal">
            <div className="apresentacaoEsquerda">
                <h1 className="textInfo titulo">NÃO SAIA DO PARÁ.</h1>
                <p className="textInfo">SEM LEVAR UMA LEMBRANÇA COM VOCÊ. <br/> OLÁ VISITANTE, AQUI VOCÊ ENCONTRA O MELHOR DA CULTURA AMAZÔNICA EM LEMBRANÇAS ÚNICAS E AUTÊNTICAS. <br/>LEVE UM POUCO DA BELEZA DA AMAZÔNIA PARA CASA!</p>
                <span className="btnScroll textInfo" id="goProduct">IR ÀS COMPRAS</span>
            </div>
        </section>
        <div className="products">
            <h2 className="titleProduct">
                <span className="linhaMarajoara">CATALOGO DE PRODUTOS </span></h2>
            </div>
        <section className="cardsLayout">
                <nav className="itensVendaAva">
                <h3 className="nomeCompra">Miriti</h3>
                    <ul className="cartoesOrg">
                        <CardsProducts
                            imagem="pMiriti"
                            item="Barco de miriti"
                            descricaoItem="Um belo barco artesanal feito de miriti."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 1,
                                    item: "Barco de miriti",
                                })
                            }
                        />

                        <CardsProducts
                            imagem="tMiriti"
                            item="Casal de Miriti"
                            descricaoItem="Artesanato delicado representando um casal feito à mão com miriti, perfeito para decoração."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 2,
                                    item: "Casal de Miriti",
                                })
                            }
                        />

                        <CardsProducts
                            imagem="qMiriti"
                            item="Cobra de Miriti"
                            descricaoItem="Artesanato vibrante de uma cobra feita de miriti, ideal para enfeitar espaços temáticos."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 3,
                                    item: "Cobra de Miriti",
                                })
                            }
                        />

                        <CardsProducts
                            imagem="sMiriti"
                            item="Pássaro de Miriti"
                            descricaoItem="Artesanato detalhado de um pássaro colorido feito de miriti, trazendo vida e beleza para qualquer ambiente."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 4,
                                    item: "Pássaro de Miriti",
                                })
                            }
                        />

                    </ul>
                    <h3 className="nomeCompra">MARAJOARA</h3>
                    <ul className="cartoesOrg">

                        <CardsProducts
                            imagem="pVaso"
                            item="Vaso Marajoara"
                            descricaoItem="Um vaso artístico inspirado nas tradições Marajoara, perfeito para decorar ambientes com estilo cultural."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 5,
                                    item: "Vaso Marajoara",
                                })
                            }
                        />
                        
                        <CardsProducts
                            imagem="qVaso"
                            item="Máscara Marajoara"
                            descricaoItem="Máscara decorativa com detalhes únicos que homenageiam a arte Marajoara, feita à mão."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 6,
                                    item: "Máscara Marajoara",
                                })
                            }
                        />

                        <CardsProducts
                            imagem="sVaso"
                            item="Xícara Marajoara"
                            descricaoItem="Xícara artesanal com desenhos inspirados na cultura Marajoara, ideal para momentos especiais."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 7,
                                    item: "Xícara Marajoara",
                                })
                            }
                        />

                        <CardsProducts
                            imagem="tVaso"
                            item="Face Marajoara"
                            descricaoItem="Arte decorativa em formato de face, esculpida com estilo Marajoara, perfeita para coleção."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 8,
                                    item: "Face Marajoara",
                                })
                            }
                        />

                    </ul>
                    <h3 className="nomeCompra">Cheiros do pará</h3>
                    <ul className="cartoesOrg">
                        <CardsProducts
                            imagem="pCheiro"
                            item="Cheiro do Amor"
                            descricaoItem="Perfume encantador com notas doces e florais que evocam os apaixonantes aromas da região do Pará."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 9,
                                    item: "Cheiro do Amor",
                                })
                            }
                        />
 
                        <CardsProducts
                            imagem="tCheiro"
                            item="Cheiro do Pará"
                            descricaoItem="Fragrância única com notas exóticas de ervas e frutas locais, representando o espírito aromático do Pará."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 10,
                                    item: "Cheiro do Pará",
                                })
                            }
                        />

                        <CardsProducts
                            imagem="sCheiro"
                            item="Banho Cheiroso de São João"
                            descricaoItem="Essência refrescante com toque herbal e cítrico, perfeita para revitalizar durante as festas juninas."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 11,
                                    item: "Banho Cheiroso de São João",
                                })
                            }
                        />

                        <CardsProducts
                            imagem="qCheiro"
                            item="Perfume de Patchouli"
                            descricaoItem="Perfume intenso e marcante com notas de patchouli, ideal para destacar personalidade e elegância."
                            onClick={() =>
                                handleAdicionarCarrinho({
                                    id: 12,
                                    item: "Perfume de Patchouli",
                                })
                            }
                        />
                        
                    </ul>
                </nav>
        </section>
            </main>
        </>
    )
}

export default Home