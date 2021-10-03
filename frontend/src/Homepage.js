import Login from "./Login";
import Register from "./Register";
import "./style.css";


const Homepage = () => {
    return (
        <div className="homepage">
            <a href="/login"><h1>Login</h1></a>
            <a href="/register"><h1>Register</h1></a>
        </div>
    );
}


export default Homepage;