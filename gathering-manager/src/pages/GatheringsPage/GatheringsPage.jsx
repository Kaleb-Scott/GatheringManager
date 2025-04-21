import Header from "../../components/Header/Header";
import styles from "./GatheringsPage.module.css";
import { useState, useEffect } from "react";
import GatheringCreationPopup from "../../components/GatheringCreationPopup/GatheringCreationPopup";
import { getGatheringByRSVPCode, getGatheringByAttendanceCode, rsvpUser, confirmAttendance,
    getRegisteredGatherings, getCurrentGatherings, getPastGatherings, deleteGathering
 } from "../../api/data";


function GatheringsPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [registeredGatherings, setRegisteredGathereings] = useState([]);
    const [currentGatherings, setCurrentGatherings] = useState([]);
    const [pastGatherings, setPastGatherings] = useState([]);

    useEffect(() => {
        getgatherings();
    }, []);

    async function getgatherings() {
        setRegisteredGathereings(await getRegisteredGatherings());
        setCurrentGatherings(await getCurrentGatherings());
        setPastGatherings(await getPastGatherings());
    }

    async function confirmRSVPCode() {
        let code = prompt("please enter your code: ");
        
        if(!code) {
            alert("Error: No Code Entered.");
            return;
        } else if(code.length !== 10 || !code.toUpperCase().match(/^[A-Z0-9]{10}$/)) {
            alert("Error: Code does not match required format.")
            return;
        }

        code = code.toUpperCase();

        let gathering = await getGatheringByRSVPCode(code);

        if(!gathering || new Date(gathering.time) <= new Date()) {
            alert("Sorry, but that code is either invalid or has expired.");
            return;
        }

        let confirmation = window.confirm(`Is this the correct gathering?\nName: ${gathering.name}\nTime: ${gathering.time}`);

        if(!confirmation) {
            return;
        }

        if(await rsvpUser(gathering.id)) {
            alert("RSVP performed successfully.");
        } else {
            alert("Failed to execute RSVP.")
        }
    }

    async function confirmAttendanceCode() {
        let code = prompt("please enter your code: ");
        
        if(!code) {
            alert("Error: No Code Entered.");
            return;
        } else if(code.length !== 10 || !code.toUpperCase().match(/^[A-Z0-9]{10}$/)) {
            alert("Error: Code does not match required format.")
            return;
        }

        code = code.toUpperCase();

        let gathering = await getGatheringByAttendanceCode(code);

        if(!gathering || new Date(gathering.time) > new Date()) {
            alert("Sorry, but that code is either invalid or the gathering has not started yet.");
            return;
        }

        let confirmation = window.confirm(`Is this the correct gathering?\nName: ${gathering.name}\nTime: ${gathering.time}`);

        if(!confirmation) {
            return;
        }

        if(await confirmAttendance(gathering.id)) {
            alert("Confirmed attendance successfully.");
        } else {
            alert("Failed to confirm attendance.")
        }
    }

    async function handleDelete(gathering) {
        console.log("gathering: " + gathering.name);

        let confirmation = window.confirm("Are you sure you want to delete this gathering?");

        if(!confirmation) {
            return;
        }

        let response = await deleteGathering(gathering.id);

        if(response) {
            alert("Successfully deleted the gathering.");
        } else {
            alert("Failed to delete gatherings.");
        }
    }

    async function handleEdit(gathering) {
        
    }

    async function handleView(gathering) {
        
    }

    return (
        <>
            <Header/>
            <main>
                {isPopupOpen && (<GatheringCreationPopup onClose={setIsPopupOpen}/>)}
                <header>
                    <div>
                        <h1>Stats Page</h1>
                    </div>
                </header>
                <h2>Gatherings you have signed up for.</h2>
                <button onClick={confirmRSVPCode}>RSVP Using Code</button>
                <button onClick={confirmAttendanceCode}>Enter Attendance Code</button>
                <div className={styles.contentBox}>
                    <table>
                        <tbody>
                            {registeredGatherings.map(data => (
                                <tr key={data.id}>
                                    <td>{data.name}</td>
                                    <td>{new Date(data.time).toLocaleString()}</td>
                                    <td><button>View</button></td>
                                    <td><button>Unregister</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Your current gatherings.</h2>
                <button onClick={() => setIsPopupOpen(true)}>Create Gathering</button>
                <div className={styles.contentBox}>
                    <table>
                        <tbody>
                            {currentGatherings.map(data => (
                                <tr key={data.id}>
                                    <td>{data.name}</td>
                                    <td>{new Date(data.time).toLocaleString()}</td>
                                    <td><button onClick={() => handleEdit(data)}>Edit</button></td>
                                    <td><button onClick={() => handleDelete(data)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Your past gatherings.</h2>
                <div className={styles.contentBox}>
                    <table>
                        <tbody>
                            {pastGatherings.map(data => (
                                <tr  key={data.id}>
                                    <td>{data.name}</td>
                                    <td>{new Date(data.time).toLocaleString()}</td>
                                    <td><button onClick={() => handleView(data)}>View</button></td>
                                    <td><button onClick={() => handleDelete(data)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}

export default GatheringsPage;