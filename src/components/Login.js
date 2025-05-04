import { useState } from "react";
import api from "../services/api";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/usuarios/login", { email, password });

        setMessage(response.data.message);
        console.log("Login bem-sucedido:", response.data);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token); 
          localStorage.setItem("userName", response.data.user.name); 
          localStorage.setItem("userEmail", response.data.user.email); // Salva o email
          localStorage.setItem("userId", response.data.user.id); // Salva o ID
      }

        if (onClose) onClose(); // Fecha o modal
    } catch (error) {
        console.error("Erro no login:", error.response ? error.response.data : error.message);
        setMessage(error.response.data.message || "Erro ao realizar login.");
    }
};

  

  return (
    <>
      <div className="modal-content">
        <form onSubmit={handleLogin} className="loginForm">
          <h2 className="loginTitle">FAZER LOGIN</h2>
          {message && <p>{message}</p>}
          <div className="loginInfo">
            <label>Email</label>
            <input
              type="email"
              className="inputLogin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="loginInfo">
            <label>Senha</label>
            <input
              type="password"
              className="inputLogin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="loginInfo">
            <input type="checkbox" name="rememberUser" id="rememberMe" />
            <label htmlFor="rememberMe">Lembre-me</label>
          </div>
          <div className="submitLogin">
            <input type="submit" value="Entrar" id="submitButton" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
