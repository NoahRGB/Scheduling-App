import "./style.css";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"; 

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const registerCheck = async () => {
        let response = await fetch("http://localhost:8000/register", {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        let data = await response.json();
        return data;
    }

    const onSubmit = async () => {
        const response = await registerCheck();
        if (response.status === "User registered") {
            history.push("/login");
        } else {
            alert(response.status);
        }
    }
    
    const pd = (e) => e.preventDefault();

    return (
        <div className="form-page">
            <div className="form-container">
                <h1>Register</h1>
                <form action="http://localhost:8000/register" method="POST" onSubmit={pd}>
                    <label htmlFor="registerUsername">Username:</label><br/>
                    <input onChange={_ => setUsername(_.target.value)} className="input" type="text" name="registerUsername" id="register-username-input"/><br/>
                    <label htmlFor="registerPassword">Password:</label><br/>
                    <input onChange={_ => setPassword(_.target.value)} className="input" type="text" name="registerPassword" id="register-password-input"/><br/>
                    <input type="submit" value="Register" onClick={onSubmit}/>
                </form>
            </div>
        </div>
    );
}




export default Register;