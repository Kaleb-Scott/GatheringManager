import Header from "../../components/Header/Header";
import styles from "./GatheringsPage.module.css";
import { useState } from "react";
import GatheringCreationPopup from "../../components/GatheringCreationPopup/GatheringCreationPopup";


function GatheringsPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const dataList = ["Test Value 1", "Test Value 2", "Test Value 3", "Test Value 4", "Test Value 5", "Test Value 6"];

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
                <button>RSVP Using Code</button>
                <button>Enter Attendance Code</button>
                <div className={styles.contentBox}>
                    <table>
                        <tbody>
                            {dataList.map(data => (
                                <tr key={data}>
                                    <td>data</td>
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
                            {dataList.map(data => (
                                <tr key={data}>
                                    <td>data</td>
                                    <td><button>Edit</button></td>
                                    <td><button>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Your past gatherings.</h2>
                <div className={styles.contentBox}>
                    <table>
                        <tbody>
                            {dataList.map(data => (
                                <tr  key={data}>
                                    <td>data</td>
                                    <td><button>View</button></td>
                                    <td><button>Delete</button></td>
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