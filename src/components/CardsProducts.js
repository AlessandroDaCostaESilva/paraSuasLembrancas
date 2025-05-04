const CardsProducts = (props) => {
    return (
        <li className="cartao">
            <div
                className={`imagmexemplo ${props.imagem}`}
                onClick={props.onClick} // Passa o evento de clique
                style={{ cursor: "pointer" }} // Indica visualmente que é clicável
            ></div>
            <div className="maisInfo">
                <h4 className="nomeItem">{props.item}</h4>
                <p className="descricaoItem">{props.descricaoItem}</p>
                <button
                    className="carrinho"
                    onClick={props.onClick} // Também adiciona ao carrinho no clique do botão
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </li>
    );
};

export default CardsProducts;
