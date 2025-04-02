
const Login = ({ onClose }) =>{
    return(
        <>
        <div className="modal-content">
        {<form action="#" className="loginForm">
            <h2 className="loginTitle">FAZER LOGIN</h2>
            <div className="loginInfo">
                <label>Nome de usuário</label>
                <input type="text" className="inputLogin" required />
            </div>
            <div className="loginInfo">
                <label>Senha</label>
                <input type="password" className="inputLogin" required />
            </div>
            <div className="loginInfo">
                <input type="checkbox" name="rememberUser" id="rememberMe" />
                <label>Lembre-me</label>
            </div>
            <div className="submitLogin">
                <input type="submit" value="Entrar" id="submitButton" />
            </div>
        </form>}
                </div>
        </>
    )
}

export default Login