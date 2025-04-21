import styles from "./Header.module.css";
import { FaRegUserCircle } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

function Header() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    function handleLogin(credentialResponse) {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Decoded User:", decoded);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", decoded.email);
            localStorage.setItem("userName", decoded.name);
            localStorage.setItem("userImage", decoded.picture);
            window.location.reload();
        } catch (error) {
            console.error("Error decoding token", error);
        }
    }

    function handleLogOut() {
        googleLogout();
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userImage");
        window.location.reload();
    }
    
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/community">Public Gatherings</Link></li>
                        <li><Link to="/gatherings">Manage Gatherings</Link></li>
                        <li><Link to="/stats">Statistics</Link></li>
                        <li>
                            {isLoggedIn ? (
                                <FaRegUserCircle onClick={handleLogOut} />
                            ) : (
                                <GoogleLogin
                                    onSuccess={handleLogin}
                                    onError={() => console.log("Login Failed")}
                                />
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
