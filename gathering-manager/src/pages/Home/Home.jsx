/*import logo from '../../logo.svg';
import '../../App.css';
import { useEffect, useState } from 'react';
import { getUsers } from '../../api/data';
import Header from '../../components/Header/Header';


function Test(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setUsers(await getUsers());
    }    

    return (
        <>
            <Header/>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <ul>
                        <li>before</li>
                        <li>{users.length}</li>
                        {users.map((user) => (
                            <li key={user.username}>{user.username}</li>
                        ))}
                        <li>after</li>
                    </ul>
                </header>
            </div>
        </>
    );
}

export default Test*/
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header"; 
import styles from "./Home.module.css";

import welcomesImage from "../../assets/welcomes.jpg"; 

function HomePage() {
  
  return (
    <>
      <Header /> {/* use the common sticky Header */}
      <div className={styles.container}>
        
        {/* Hero Section */}

        <section className={styles.hero}>
        <img src={welcomesImage} alt="Welcomes" className={styles.heroImage} />
          <div className={styles.heroContent}>
            <h1>Welcome to Arise and Shine Events!</h1>
            <p>Connecting Communities Through Memorable Gatherings</p>
            <Link to="/community" className={styles.ctaButton}>Explore Events</Link>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.aboutSection}>
          <h2>Our Mission</h2>
          <p>
            At Arise and Shine Events, we believe in the power of community. Our platform brings people together through diverse events that inspire, educate, and entertain.
          </p>
        </section>

       

      </div>
    </>
  );
}

export default HomePage;

