import { Link } from 'react-router-dom'

const CardsProducts = (props) =>{
    return (
        <li className="cartao">
            <div className={`imagmexemplo ${props.imagem}`}></div>
                <div className="maisInfo">
                    <h4 className="nomeItem">{props.item}</h4>
                        <p className="descricaoItem">{props.descricaoItem}</p>
                            <Link to='/'className="carrinho">
                                Adicionar ao carrinho
                            </Link>
                </div>
        </li>
    )
}

export default CardsProducts