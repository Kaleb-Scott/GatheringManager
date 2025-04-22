import Header from "../../components/Header/Header";
import styles from "./GatheringsPage.module.css";
import { useState, useEffect } from "react";
import GatheringCreationPopup from "../../components/GatheringCreationPopup/GatheringCreationPopup";
import GatheringUpdatePopup from "../../components/GatheringUpdatePopup/GatheringUpdatePopup";
import GatheringViewPopup from "../../components/GatheringViewPopup/GatheringViewPopup";
import { getGatheringByRSVPCode, getGatheringByAttendanceCode, rsvpUser, confirmAttendance,
    getRegisteredGatherings, getCurrentGatherings, getPastGatherings, deleteGathering, unregister
 } from "../../api/data";


function GatheringsPage() {
    const [isCreationPopupOpen, setIsCreationPopupOpen] = useState(false);
    const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
    const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
    const [selectedGathering, setSelectedGathering] = useState(null);
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
        console.log("gathering: " + gathering.name);

        setSelectedGathering(gathering);
        setIsUpdatePopupOpen(true);
        
    }

    async function handleView(gathering) {
        console.log("gathering: " + gathering.name);

        setSelectedGathering(gathering);
        setIsViewPopupOpen(true);
    }

    async function handleUnregister(gathering) {
        console.log(gathering.name);

        let confirmation = window.confirm("Are you sure you want to unregister from this gathering?");

        if(!confirmation) {return;}

        let response = unregister(gathering.id);

        if(!response) {
            alert("Failed to unregister from the gathering.");
        } else {
            alert("Successfully unregistered from the gathering.")
        }
    }

    if(localStorage.getItem("isLoggedIn") !== "true") {
        return (
            <>
                <Header/>
                <main>
                    <p>Please login to access the contents of this page.</p>
                </main>
            </>
        )
    }

    return (
        <>
            <Header/>
            <main>
                {isCreationPopupOpen && (<GatheringCreationPopup onClose={setIsCreationPopupOpen}/>)}
                {isUpdatePopupOpen && (<GatheringUpdatePopup isOpen={isUpdatePopupOpen} onClose={setIsUpdatePopupOpen} gathering={selectedGathering}/>)}
                {isViewPopupOpen && (<GatheringViewPopup isOpen={isViewPopupOpen} onClose={setIsViewPopupOpen} gathering={selectedGathering}/>)}
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
                                    <td><button onClick={() => handleView(data)}>View</button></td>
                                    <td><button onClick={() => handleUnregister(data)}>Unregister</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Your current gatherings.</h2>
                <button onClick={() => setIsCreationPopupOpen(true)}>Create Gathering</button>
                <div className={styles.contentBox}>
                    <table>
                        <tbody>
                            {currentGatherings.map(data => (
                                <tr key={data.id}>
                                    <td>{data.name}</td>
                                    <td>{new Date(data.time).toLocaleString()}</td>
                                    <td>{data.rsvp_code}</td>
                                    <td>{data.attendance_code}</td>
                                    <td><button>New Codes</button></td>
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