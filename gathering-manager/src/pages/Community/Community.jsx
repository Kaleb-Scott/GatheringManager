import Header from "../../components/Header/Header";
import styles from "./Community.module.css";

const gatherings = [
  {
    id: 1,
    title: "Community Potluck",
    time: "2025-04-20T18:00",
    description: "Join us for a fun evening of shared food and good vibes!",
    tags: ["Food", "Neighborhood", "Outdoor"],
  },
  {
    id: 2,
    title: "Tech Meetup",
    time: "2025-04-25T19:30",
    description: "Meet local developers, designers, and tech enthusiasts.",
    tags: ["Tech", "Networking", "Indoor"],
  },
];


/*function Community() {
    return (
        <>
            <Header/>
            <main className="Community Page"></main>
            <h1>Community Page</h1>
           
            <p>Welcome to Arise and Shine Event!</p>
            <p>Explore and join public events in your Community</p>

             <body>
             <div className="filters">
                <input type="text" placeholder="Search by tag..... "   />
                <input type ="date" />
             </div>
                 <div className={styles.contentBox}>
                 <table>
                                {gatherings.map(gatherings => (
                                    <tr>
                                        <td>Name</td>
                                        <td><text>Time</text></td>
                                        <td><text>Tag</text></td>
                                    </tr>
                                     
                                ))}
                            </table>
                 
                 </div>
                 



             </body>
          
            
            
        </>
        
    );
}

export default Community;*/




/*function Community() {
  return (
    <>
      <Header />
      <main className="community-page">
        <h1>Public Gatherings</h1>
        <p>Explore and join public events in your community</p>

        <div className="filters">
          <input type="text" placeholder="Search by tag..." />
          <input type="date" />
        </div>
        <div className={styles.contentBox}>
        
        <div className="gathering-list">
          {gatherings.map((event) => (
            <div className="gathering-card" key={event.id}>
              <h2>{event.title}</h2>
              <p><strong>Time:</strong> {new Date(event.time).toLocaleString()}</p>
              <p>{event.description}</p>
              <div className="tags">
                {event.tags.map((tag, index) => (
                  <span className="tag" key={index}>{tag}</span>
                ))}
              </div>
              <button className="rsvp-button">Join Event</button>
            </div>
          ))}
        </div>
        
        </div>

        
      </main>
    </>
  );
}

export default Community;*/

import Header from "../../components/Header/Header";
import styles from "./Community.module.css";
//import { FaTag, FaUserPlus } from "react-icons/fa";


const eventsData = [
  {
    id: 1,
    title: "Birthday Bash",
    time: "2025-05-10T17:00",
    description: "Celebrate Alex's 30th birthday!",
    tags: ["Birthday", "Party"],
  },
  {
    id: 2,
    title: "University Symposium",
    time: "2025-05-12T10:00",
    description: "Annual tech and research showcase.",
    tags: ["Education", "Tech"],
  },
  {
    id: 3,
    title: "Summer Cookout",
    time: "2025-06-01T14:00",
    description: "Join us for a fun summer gathering in the park.",
    tags: ["Outdoor", "Food"],
  },
];

function Community() {
  return (
    <>
      <Header />
      <main className="community-page">
        <h1 style={{ textAlign: "center" }}>Community Page</h1>
        <p style={{ textAlign: "left" }}>
          Welcome to Arise and Shine Event
          <br />
          Explore and join public events in your community.
        </p>

        <div className={styles.outerContentBox}>
          {eventsData.map((event) => (
            <div key={event.id} className={styles.innerContentBox}>
              <h2>{event.title}</h2>
              <p><strong>Time:</strong> {new Date(event.time).toLocaleString()}</p>
              <p>{event.description}</p>
              <div className={styles.tags}>
                {event.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <button className={styles.joinButton}>Join</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
export default Community;