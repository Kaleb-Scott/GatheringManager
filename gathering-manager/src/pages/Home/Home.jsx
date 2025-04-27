
/*import { Link } from "react-router-dom";
import Header from "../../components/Header/Header"; 
import styles from "./Home.module.css";

import welcomesImage from "../../assets/welcomes.jpg"; 

function HomePage() {
  
  return (
    <>
      <Header /> {/* use the common sticky Header }
      <div className={styles.container}>
        
        {/* Hero Section }

        <section className={styles.hero}>
        <img src={welcomesImage} alt="Welcomes" className={styles.heroImage} />
          <div className={styles.heroContent}>
            <h1>Welcome to Arise and Shine Events!</h1>
            <p>Connecting Communities Through Memorable Gatherings</p>
            <Link to="/community" className={styles.ctaButton}>Explore Events</Link>
          </div>
        </section>

        {/* About Section }
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

export default HomePage;*/
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";

import welcomesImage from "../../assets/welcomes.jpg";

function HomePage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <img
            src={welcomesImage}
            alt="Welcome Banner"
            className={styles.heroImage}
          />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Welcome to Arise and Shine Events!</h1>
            <p className={styles.heroSubtitle}>
              Connecting Communities Through Memorable Gatherings
            </p>
            <div className={styles.buttonWrapper}>
              <Link to="/community" className={styles.ctaButton}>
                Explore Events
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutTitle}>Our Mission</h2>
          <p className={styles.aboutText}>
            At Arise and Shine Events, we believe in the power of community. 
            Our platform brings people together through diverse events that 
            inspire, educate, and entertain.
          </p>
        </section>
      </div>
    </>
  );
}

export default HomePage;

