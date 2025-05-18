import { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [emailStatus, setEmailStatus] = useState(""); 
    const navigate = useNavigate();

    // Validação de e-mail
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Validação de senha forte
    const validatePassword = (password) => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.])[A-Za-z\d@$!%*?&\.]{8,}$/;
        return strongRegex.test(password);
    };

    // Verifica se o e-mail já existe 
    useEffect(() => {
        if (email && validateEmail(email)) {
            const checkEmail = async () => {
                try {
                    const response = await api.get(`/usuarios/check-email?email=${email}`);
                    if (response.data.exists) {
                        setEmailStatus("❌ E-mail já cadastrado");
                    } else {
                        setEmailStatus("✔ E-mail disponível");
                    }
                } catch (error) {
                    setEmailStatus("");
                }
            };
            const timer = setTimeout(checkEmail, 1000); 
            return () => clearTimeout(timer);
        } else {
            setEmailStatus("");
        }
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setMessage("A senha deve ter: 8+ caracteres, 1 maiúscula, 1 número e 1 especial (@$!%*?&.)");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("As senhas não coincidem!");
            return;
        }

        if (!validateEmail(email)) {
            setMessage("Formato de e-mail inválido!");
            return;
        }

        if (emailStatus === "❌ E-mail já cadastrado") {
            setMessage("Este e-mail já está em uso!");
            return;
        }

        try {
            // 1. Cria o usuário
            await api.post("/usuarios", { 
                name, 
                email, 
                password,
                date: new Date().toISOString()
            });

            // 2. Login automático
            const loginResponse = await api.post("/usuarios/login", { 
                email, 
                password 
            });

            // 3. Armazena os dados
            localStorage.setItem("token", loginResponse.data.token);
            localStorage.setItem("userId", loginResponse.data.user.id);
            localStorage.setItem("userName", name);

            // 4. Redireciona
            navigate("/");
            
        } catch (error) {
            setMessage(error.response?.data?.message || 
                "Erro ao registrar. Verifique os dados e tente novamente.");
        }
    };

    return (
        <>
            <Header />
            <section className="layoutMain">
                <form onSubmit={handleSubmit} className="formRegister">
                    <h1 className="registerTitle">REGISTRAR-SE</h1>
                    {message && <p style={{ color: "red" }}>{message}</p>}

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
                        {emailStatus && (
                            <small style={{ 
                                color: emailStatus.includes("❌") ? "red" : "green",
                                display: "block",
                                marginTop: "5px"
                            }}>
                                {emailStatus}
                            </small>
                        )}
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
                            placeholder="Mínimo 8 caracteres, 1 maiúscula, 1 número, 1 especial"
                        />
                        <div className="password-strength">
                            {password && (
                                <span style={{ 
                                    color: validatePassword(password) ? "green" : "red",
                                    fontSize: "0.8rem"
                                }}>
                                    {validatePassword(password) ? "✔ Senha forte" : "✘ Senha fraca"}
                                </span>
                            )}
                        </div>
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