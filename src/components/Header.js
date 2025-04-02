import '../css/header.css'
import '../css/actions.css'
import Logo from '../img/logo.svg'
import Login from '../components/Login'
import { Link } from 'react-router-dom'
import { useState } from "react"

const Header = () => {
    const [mostrar, setMostrar] = useState(false);

    return (
        <header className="headerMain">
            <nav className='navigatorDisplay'>
                <div className='logo'>
                    <Link to='/'>
                        <img src={Logo} alt='Logo-Pará-Suas-Lembranças'/>
                    </Link>
                </div>
                <ul className='listaNav midNav'>
                    <li><span className="textNav" id="btnSup">SUPORTE</span></li>
                    <li><Link to="/sobre" className="textNav">SOBRE</Link></li>
                    <li><Link to='/ava' className="textNav">AVALIAÇÕES</Link></li>
                </ul>
                <ul className="listaNav endNav" id="loginAndRegister">
                    <li><span 
                        className="textNav" 
                        onClick={() => {
                            setMostrar(true)
                            document.body.style.overflow = "hidden";
                        }}
                    >
                        LOGIN
                    </span></li>
                    <li className="registerNav"><Link to='/register'>REGISTRAR-SE</Link></li>
                </ul>
            </nav>
            
            {mostrar && (
    <section 
        className='telaToda' 
        onClick={() => {
            setMostrar(false);
            document.body.style.overflow = 'auto';
        }}
    >
        <div onClick={(e) => e.stopPropagation()}>  {/* Impede que o clique no modal feche */}
            <Login onClose={() => {
                setMostrar(false);
                document.body.style.overflow = 'auto';
            }} />
        </div>
    </section>
)}
        </header>
    );
}


export default Header