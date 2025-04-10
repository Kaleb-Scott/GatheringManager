import styles from "./Header.module.css";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";





function Header() {

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div>
                    <ul>
                        <li>Home</li>
                        <li>Public Gatherings</li>
                        <li>Manage Gatherings</li>
                        <li>Statistics</li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;