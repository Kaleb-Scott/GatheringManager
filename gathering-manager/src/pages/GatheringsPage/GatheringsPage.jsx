import Header from "../../components/Header/Header";
import styles from "./GatheringsPage.module.css";

const dataList = ["Test Value 1", "Test Value 1", "Test Value 1", "Test Value 1", "Test Value 1", "Test Value 1"];

function GatheringsPage() {
    return (
        <>
            <Header/>
            <body>
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
                        {dataList.map(data => (
                            <tr>
                                <td>data</td>
                                <td><button>View</button></td>
                                <td><button>Unregister</button></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <h2>Your current gatherings.</h2>
                <button>Create Gathering</button>
                <div className={styles.contentBox}>
                <table>
                        {dataList.map(data => (
                            <tr>
                                <td>data</td>
                                <td><button>Edit</button></td>
                                <td><button>Delete</button></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <h2>Your past gatherings.</h2>
                <div className={styles.contentBox}>
                <table>
                        {dataList.map(data => (
                            <tr>
                                <td>data</td>
                                <td><button>View</button></td>
                                <td><button>Delete</button></td>
                            </tr>
                        ))}
                    </table>
                </div>
            </body>
        </>
    );
}

export default GatheringsPage;