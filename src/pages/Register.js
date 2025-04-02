import { useState } from "react";
import api from "../services/api";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("As senhas não coincidem!");
            return;
        }

        try {
            const response = await api.post("/usuarios", {
                name,
                email,
                password,
            });

            setMessage(response.data.message);
            console.log(response.data);

            // Salvar o token e o nome do usuário no localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", name);

            // Redireciona para a página inicial
            navigate("/");

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Erro ao registrar usuário.");
            }
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Header />
            <section className="layoutMain">
                <form onSubmit={handleSubmit} className="formRegister" id="formRegister">
                    <h1 className="registerTitle">REGISTRAR-SE</h1>
                    {message && <p>{message}</p>}
                    <div className="boxRelative">
                        <label htmlFor="name" className="labelLR">Nome de usuário</label>
                        <input
                            type="text"
                            id="name"
                            className="inputRegister"
                            autoComplete="off"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="boxRelative">
                        <label htmlFor="email" className="labelLR">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="inputRegister"
                            autoComplete="off"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="boxRelative">
                        <label htmlFor="password" className="labelLR">Senha</label>
                        <input
                            type="password"
                            id="password"
                            className="inputRegister"
                            autoComplete="off"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="boxRelative">
                        <label htmlFor="confirmPassword" className="labelLR">Confirme sua senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="inputRegister"
                            autoComplete="off"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="confirmBox">
                        <input type="submit" value="EFETUAR REGISTRO" id="register" />
                        <span className="RegisterDados">
                            <a href="../../index.html">EFETUAR LOGIN</a>
                        </span>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
