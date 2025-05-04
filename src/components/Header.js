import '../css/header.css'
import '../css/actions.css'
import Logo from '../img/logo.svg'
import Login from '../components/Login'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"

const Header = () => {
    const [mostrar, setMostrar] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const storedId = localStorage.getItem("userId");
    
        console.log("Nome do usuário:", storedName);
        console.log("ID do usuário:", storedId);
    
        if (storedName) setUserName(storedName);
        if (storedId) setUserId(storedId);
    }, []);
    
    {userId && userId !== "null" && (
        <li><Link to={`/carrinho/${userId}`} className="textNav">CARRINHO</Link></li>
    )}

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId"); // Remove o ID do usuário
        setUserName(null);
        setUserId(null);
    };

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
                    {userId && userId !== "null" && 
                        <li><Link to={`/carrinho/${userId}`} className="textNav">HISTORICO</Link></li>
                    }
                </ul>
                <ul className="listaNav endNav" id="loginAndRegister">
                    {userName ? (
                        <>
                            <li className="textNav">Olá, {userName}!</li>
                            <li className="textNav" onClick={handleLogout}>Logout</li>
                        </>
                    ) : (
                        <>
                            <li className="textNav" 
                                onClick={() => {
                                    setMostrar(true);
                                    document.body.style.overflow = "hidden";
                                }}
                            >
                                LOGIN
                            </li>
                            <li className="registerNav"><Link to='/register'>REGISTRAR-SE</Link></li>
                        </>
                    )}
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
                    <div onClick={(e) => e.stopPropagation()}>
                        <Login onClose={() => {
                            setMostrar(false);
                            document.body.style.overflow = 'auto';
                            setUserName(localStorage.getItem("userName"));
                            setUserId(localStorage.getItem("userId")); // Atualiza o ID após login
                        }} />
                    </div>
                </section>
            )}
        </header>
    );
}

export default Header;
