import Header from "../components/Header"
import '../css/home.css'
import CardsProducts from "../components/CardsProducts"

const Home = () => {
    return(
        <>
            <Header />
            <main className='main'>
            <section className="exibicaoPrincipal">
            <div className="apresentacaoEsquerda">
                <h1 className="textInfo titulo">NÃO SAIA DO PARÁ</h1>
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
                        <CardsProducts imagem='pMiriti' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/>
                        <CardsProducts imagem='sMiriti' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/><CardsProducts imagem='tMiriti' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/><CardsProducts imagem='qMiriti' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/>
                    </ul>
                    <h3 className="nomeCompra">MARAJOARA</h3>
                    <ul className="cartoesOrg">
                        <CardsProducts imagem='pVaso' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/>
                        <CardsProducts imagem='sVaso' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/><CardsProducts imagem='tVaso' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/><CardsProducts imagem='qVaso' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/>
                    </ul>
                    <h3 className="nomeCompra">Cheiros do pará</h3>
                    <ul className="cartoesOrg">
                        <CardsProducts imagem='pCheiro' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/>
                        <CardsProducts imagem='sCheiro' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/><CardsProducts imagem='tCheiro' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/><CardsProducts imagem='qCheiro' item='Barco de miriti' descricaoItem='O barco de miriti é feita com a madeira leve da árvore miriti. É uma pequena canoa ou bote, leve e flutuante, usado principalmente em festivais culturais e celebrações tradicionais, como o Círio de Nazaré.'/>
                    </ul>
                </nav>
        </section>
            </main>
        </>
    )
}

export default Home