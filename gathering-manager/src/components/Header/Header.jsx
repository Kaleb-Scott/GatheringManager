import styles from "./Header.module.css";
import { FaRegUserCircle } from "react-icons/fa"; 
import { Link } from "react-router-dom";





function Header() {

    function handleLogin() {
        localStorage.setItem("isLoggedIn", "true");
        window.location.reload();
    }

    function handleLogOut() {
        localStorage.setItem("isLoggedIn", "false");
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
                        <li>{localStorage.getItem("isLoggedIn") === "true" ? (
                            <FaRegUserCircle onClick={handleLogOut}/>
                        ) : (
                            <button onClick={handleLogin}>Sign In</button>
                        )}</li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;