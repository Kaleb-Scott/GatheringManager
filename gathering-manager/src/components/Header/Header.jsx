import styles from "./Header.module.css";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";





function Header() {

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/community">Public Gatherings</Link></li>
                        <li><Link to="/gatherings">Manage Gatherings</Link></li>
                        <li><Link to="/stats">Statistics</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;