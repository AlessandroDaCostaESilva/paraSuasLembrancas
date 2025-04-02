import Header from "../components/Header";

const Register = () =>{
    return(
        <>
        <Header />
        <section className="layoutMain">
        <form action="#" className="formRegister" id="formRegister">
            <h1 className="registerTitle">REGISTRAR-SE</h1>
            <div className="boxRelative">
                <label for="name" className="labelLR">
                    Nome de usuário
                </label>
                <input type="text" id="name" className="inputRegister" autocomplete="off" required />
            </div>
            <div className="boxRelative">
                <label for="email" className="labelLR">
                    Email
                </label>
                <input type="email" id="email" className="inputRegister" autocomplete="off" required />
            </div>
            <div className="boxRelative">
                <label for="password" className="labelLR">
                    Senha
                </label>
                <input type="password" id="password" className="inputRegister" autocomplete="off" required />
            </div>
            <div className="boxRelative">
                <label for="confirmPassword" className="labelLR">
                    Confirme sua senha
                </label>
                <input type="password" id="confirmPassword" className="inputRegister" autocomplete="off" required />
            </div>
            <div className="confirmBox">
                <input type="submit" value="EFETUAR REGISTRO" id="register" />
                <span className="RegisterDados" >
                    <a href="../../index.html">EFETUAR LOGIN</a>
                </span>
            </div>
        </form>
        </section>
        </>
    )
}

export default Register