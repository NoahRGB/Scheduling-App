import { useState, useContext } from "react";
import { useHistory } from "react-router-dom"; 
import { LoginContext } from "./Context"; 
import "./style.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const ctx = useContext(LoginContext);

    const history = useHistory();

    const checkAuthenticate = async (username, password) => {
        let response = await fetch("http://localhost:8000/login", {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        let data = await response.json();
        return data;
    }

    const onSubmit = async () => {
        const authCheck = await checkAuthenticate(username, password);
        if (authCheck.status == "success") {
            ctx.setIsAuthenticated(true);
            history.push("/calendar");
        } else if (authCheck.status == "fail") {
            ctx.setIsAuthenticated(false);
            alert("Login attempt failed");
        }
    }

    const pd = (e) => e.preventDefault();

    return (
        <LoginContext.Consumer>{(context) => {
            return (
                <div className="login-page">
                    <div className="form-container">
                        <h1>Login</h1>
                        <form action="http://localhost:8000/login" method="POST" onSubmit={pd}>
                            <label htmlFor="username">Username:</label><br/>
                            <input name="username" className="input" onChange={_ => setUsername(_.target.value)}/><br/>
                            <label htmlFor="password">Password:</label><br/>
                            <input name="password" className="input" onChange={_ => setPassword(_.target.value)}/><br/>
                            <input type="submit" value="Login" onClick={e => onSubmit()}/>
                        </form>
                    </div>
                </div>
            );
        }}</LoginContext.Consumer>
    );
}


export default Login;