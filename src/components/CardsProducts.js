import React, { useState } from 'react';

const CardsProducts = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <li className="cartao"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
            <div className="containerImagem">
                <img
                    src={props.imagem}
                    alt={props.item}
                    className="imagemProduto"
                />
            </div>
            <div className={`maisInfo ${isHovered ? 'maisActive' : ''}`}>
                <h4 className="nomeItem">{props.item}</h4>
                <p className="descricaoItem">{props.descricaoItem}</p>
                <button
                    className="adicionarHistorico carrinho" 
                    onClick={props.onClick}
                    style={{ cursor: "pointer" }}
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
