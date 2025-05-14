const CardsProducts = (props) => {
    return (
        <li className="cartao">
            <div className="containerImagem">
                <img
                    src={props.imagem}
                    alt={props.item}
                    className="imagemProduto"
                    onClick={props.onClick}
                    style={{ cursor: "pointer" }}
                />
            </div>
            <div className="maisInfo">
                <h4 className="nomeItem">{props.item}</h4>
                <p className="descricaoItem">{props.descricaoItem}</p>
                <button
                    className="adicionarHistorico"
                    onClick={props.onClick}
                >
                    Adicionar ao histórico
                </button>
            </div>
        </li>
    );
};

export default CardsProducts;

//const CardsProducts = ({ imagem, item, descricaoItem, onClick }) => {
//   return (
//     <li className="cardProduto">
//       <img src={imagem} alt={item} className="imgProduto" />
//       <h4>{item}</h4>
//       <p>{descricaoItem}</p>
//       <button onClick={onClick}>Adicionar ao histórico</button>
//     </li>
//   );
// };

// export default CardsProducts;
