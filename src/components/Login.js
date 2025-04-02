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
        }
        

        if (onClose) onClose();
        
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            setMessage(error.response.data.message);
        } else {
            setMessage("Erro ao realizar login.");
        }
        console.error(error.response ? error.response.data : error.message);
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
