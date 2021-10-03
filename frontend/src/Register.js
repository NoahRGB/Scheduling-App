
const Register = () => {
    return (
        <div className="form-container">
            <h1>Register</h1>
            <form action="http://localhost:8000/register" method="POST">
                <label htmlFor="registerUsername">Username:</label><br/>
                <input className="input" type="text" name="registerUsername" id="register-username-input"/><br/>
                <label htmlFor="registerPassword">Password:</label><br/>
                <input className="input" type="text" name="registerPassword" id="register-password-input"/><br/>
                <input type="submit" value="Register"/>
            </form>
        </div>
    );
}




export default Register;