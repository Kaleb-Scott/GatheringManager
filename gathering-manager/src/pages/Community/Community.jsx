
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import styles from "./Community.module.css";
import Select from "react-select";
import { getGatheringByRSVPCode, getPublicGatherings, getPublicGatheringsPaginated, getTags, rsvpUser } from "../../api/data";

/*
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
  {
    id: 4,
    title: "Charity Concert",
    time: "2025-05-20T19:00",
    description: "A concert to support local charities organized by volunteers.",
    tags: ["Charity", "Music"],
  },
  {
    id: 5,
    title: "Career Fair",
    time: "2025-05-22T09:00",
    description: "University event to connect students with potential employers.",
    tags: ["Education", "Career"],
  },
  {
    id: 6,
    title: "Company Picnic",
    time: "2025-05-25T12:00",
    description: "Join your coworkers and their families for a fun day in the sun.",
    tags: ["Corporate", "Family"],
  },
  {
    id: 7,
    title: "Kaleb Wedding",
    time: "2025-06-05T18:30",
    description: "Celebrate love in an elegant private setting.",
    tags: ["Wedding", "Love"],
  },
  {
    id: 8,
    title: "Training Bootcamp",
    time: "2025-06-08T07:00",
    description: "Daily training sessions for all fitness levels.",
    tags: ["Fitness", "Health"],
  },
  {
    id: 9,
    title: "Tech Conference Speaker Check-In",
    time: "2025-06-12T08:00",
    description: "Register and pick up your badge for the upcoming tech talks.",
    tags: ["Tech", "Conference"],
  },
  {
    id: 10,
    title: "Research Symposium",
    time: "2025-06-15T09:30",
    description: "Present your research and collaborate with other scholars.",
    tags: ["Academic", "Research"],
  },
  {
    id: 11,
    title: "Neighborhood Potluck",
    time: "2025-06-18T17:00",
    description: "Share food and stories with neighbors.",
    tags: ["Community", "Food"],
  },
  {
    id: 12,
    title: "Art Expo",
    time: "2025-06-20T15:00",
    description: "Discover local artists and their creations.",
    tags: ["Art", "Exhibition"],
  },
  {
    id: 13,
    title: "Coding Bootcamp Graduation",
    time: "2025-06-22T10:00",
    description: "Celebrate the achievements of future developers.",
    tags: ["Tech", "Education"],
  },
  {
    id: 14,
    title: "Startup Pitch Night",
    time: "2025-06-25T18:00",
    description: "Watch new startups pitch their ideas to investors.",
    tags: ["Business", "Innovation"],
  },
  {
    id: 15,
    title: "Local Theater Night",
    time: "2025-06-27T19:30",
    description: "Enjoy an evening of local performances.",
    tags: ["Theater", "Culture"],
  },
  {
    id: 16,
    title: "Community Cleanup Day",
    time: "2025-06-30T09:00",
    description: "Help beautify your neighborhood.",
    tags: ["Volunteer", "Environment"],
  },
  {
    id: 17,
    title: "Science Fair",
    time: "2025-07-02T11:00",
    description: "Young minds showcase their scientific projects.",
    tags: ["Education", "Science"],
  },
  {
    id: 18,
    title: "Open Mic Night",
    time: "2025-07-04T20:00",
    description: "Share your talent or cheer on local acts.",
    tags: ["Entertainment", "Music"],
  },
  {
    id: 19,
    title: "Public Speaking Workshop",
    time: "2025-07-06T13:00",
    description: "Build confidence and hone your speaking skills.",
    tags: ["Workshop", "Skills"],
  },
  {
    id: 20,
    title: "Farmers Market",
    time: "2025-07-08T08:00",
    description: "Get fresh produce and meet local farmers.",
    tags: ["Local", "Food"],
  },
];
*/

function Community() {
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchOption, setSearchOption] = useState("AND");
  const [tagFilter, setTagFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [currentEvents, setCurrentEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 10;


  useEffect(() => {
    getAvailableTags();
  }, []);

  useEffect(() => {
    getNextPage();
  }, []);

  async function getNextPage() {

    console.log("in nextPage " + dateFilter);
    let data = await getPublicGatheringsPaginated(
      (eventsPerPage * (currentPage)),
      (eventsPerPage * (currentPage + 1) - 1),
      tagFilter,
      dateFilter,
      searchOption
    );

    console.log(data);

    if (data.length === 0) { return; }

    setCurrentPage(currentPage + 1);
    setCurrentEvents(data);
  }

  async function getPreviousPage() {


    let data = await getPublicGatheringsPaginated(
      (eventsPerPage * (currentPage - 2)),
      (eventsPerPage * (currentPage - 1) - 1),
      tagFilter,
      dateFilter,
      searchOption
    );

    console.log(data);

    if (data.length === 0) { return; }

    setCurrentPage(currentPage - 1);
    setCurrentEvents(data);
  }
  
  async function handleSubmit() {
    setTagFilter(selectedOptions.map((tag) => tag.value));
    let tmp = document.filters.date.value;
    setDateFilter((tmp ? new Date(tmp).toLocaleDateString() : tmp));
    console.log(document.filters.date.value);
    console.log(new Date(tmp).toLocaleDateString());
    setCurrentPage(1);
    
    let data = await getPublicGatheringsPaginated(
      (eventsPerPage * (0)),
      (eventsPerPage * (0 + 1) - 1),
      selectedOptions.map((tag) => tag.value),
      (tmp ? new Date(tmp).toLocaleDateString() : tmp),
      searchOption
    );

    setCurrentEvents(data);
  }

  async function rsvp(event) {
    let response = await rsvpUser(event.id);

    if(response) {
      alert("RSVP successful!");
    } else {
      alert("Failed to RSVP!");
    }
  }

  async function getAvailableTags() {
    setAvailableTags(await getTags());
  }

  const handleChange = (selected) => {
    setSelectedOptions(selected || []);
  }


  //const indexOfLastEvent = currentPage * eventsPerPage;
  //const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  //const currentEvents = eventsData.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <>
      <Header />
      
      <main className="community-page">
      <div className={styles.outerContentBox}>
        
         <h1 className={styles.communityHeader}>Community Page</h1>
        <p style={{ textAlign: "center",fontSize:20}}>
          Welcome to Arise and Shine Events
          <br />
          Explore and join public events in your community.
        </p>
        <form style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }} className="filters" name="filters">
          <Select
            name="tags"
            options={availableTags.map((tag) => ({ value: tag, label: tag }))}
            value={selectedOptions}
            onChange={handleChange}
            placeholder="Filter by tags..."
            isMulti
          />
          <input type="date" name="date" />
          <label htmlFor="searchType">Search Type:</label>
          <select name="searchType" value={searchOption} onChange={(event) => setSearchOption(event.target.value)}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
          <button type="button" className={styles.joinButton} onClick={handleSubmit}>Submit</button>
        </form>


        
          {currentEvents.map((event) => (
            <div key={event.id} className={styles.innerContentBox}>
              <div className={styles.titleAndTime}>
                <h2 className={styles.eventTitle}>{event.name}</h2>
                <p className={styles.eventTime}>
                  <strong>Time:</strong> {new Date(event.time).toLocaleString()}
                </p>
              </div>
              <p>{event.description}</p>
              <div className={styles.tags}>
                {event.Tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <br />
              <button className={styles.joinButton} onClick={() => rsvp(event)}>Join</button>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button onClick={() => getPreviousPage()}>1</button>
          <button onClick={() => getNextPage()}>2</button>
        </div>

      </main>
    </>
  );
}

export default Community;
