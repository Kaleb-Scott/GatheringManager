import styles from "./Header.module.css";
import { FaRegUserCircle } from "react-icons/fa"; 
import { Link } from "react-router-dom";





function Header() {

    function handleLogin() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then(function (googleUser) {
          var profile = googleUser.getBasicProfile();
          console.log('ID: ' + profile.getId());
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail());
          localStorage.setItem("isLoggedIn", "true");
          window.location.reload();
        });
    }

    function handleLogOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
          localStorage.setItem("isLoggedIn", "false");
          window.location.reload();
        });
    }

    window.gapi.load("auth2", function () {
        window.gapi.auth2.init({
            client_id: "47332756091-qb562fndm3tnj6de2fa1mo24juqot1ac.apps.googleusercontent.com"
        });
    });

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
