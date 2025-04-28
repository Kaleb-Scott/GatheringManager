// Header.jsx
import { useState } from "react";
import styles from "./Header.module.css";
import { FaRegUserCircle } from "react-icons/fa"; 
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getCurrentUserData, registerUser } from "../../api/data";

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    async function handleLogin(credentialResponse) {
        console.log("in login 1");
        try {
            console.log("in login");
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Decoded User:", decoded);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", decoded.email);
            localStorage.setItem("userName", decoded.name);
            localStorage.setItem("userImage", decoded.picture);
            window.location.reload();
            //console.log("after pulling data")
            const userData = await getCurrentUserData();
            if(!userData) {
                console.log("registering user");
                registerUser(localStorage.getItem("userName"), localStorage.getItem("userEmail"));
            }
        } catch (error) {
            console.error("Error decoding token", error);
        }
    }

    function handleLogOut() {
        console.log("in logout");
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
                <div className={styles.navContainer}>
                    <div className={styles.logo}>Arise & Shine Events</div>
                    
                    <div className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                    
                    <div className={`${styles.navMenu} ${mobileMenuOpen ? styles.active : ''}`}>
                        <ul className={styles.navLinks}>
                            <li onClick={closeMobileMenu}><Link to="/">Home</Link></li>
                            <li onClick={closeMobileMenu}><Link to="/community">Public Gatherings</Link></li>
                            <li onClick={closeMobileMenu}><Link to="/gatherings">Manage Gatherings</Link></li>
                            <li onClick={closeMobileMenu}><Link to="/stats">Statistics</Link></li>
                            <li onClick={closeMobileMenu}>
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
                </div>
            </nav>
        </header>
    );
}

export default Header;