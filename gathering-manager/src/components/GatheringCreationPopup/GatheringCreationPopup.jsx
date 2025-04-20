import styles from "./GatheringCreationPopup.module.css";
import { getTags } from "../../api/data";
import { useState, useEffect } from "react";
import Select from "react-select"

const GatheringCreationPopup = ({ onClose }) => {
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        getAvailableTags();
    }, []);

    async function getAvailableTags(params) {
        setAvailableTags(await getTags());
    }

    function handleSubmit() {
        console.log("submit was run.");
        onClose(false);
    }

    function handleClose() {
        document.popup.reset();
        onClose(false);
    }

    return (
        <div className={styles.popupBackground}>
            <div className={styles.popupContainer}>
                <p>Enter Gathering Information</p>
                <form className={styles.dataArea} name="popup" action={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" required/>
                    </div>
                    <div className={styles.timeContainer}>
                        <label htmlFor="time">Time: </label>
                        <input className={styles.time} type="datetime-local" name="time" id="time" required/>
                    </div>
                    <div>
                        <label htmlFor="isPublic">Public: </label>
                        <input type="checkbox" name="isPublic" id="isPublic"/>
                    </div>
                    <label htmlFor="tags">Tags: </label>
                    <Select options={availableTags.map((tag) => ({value: tag, label: tag}))} placeholder="Select tags..." required/>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" required></textarea>
                    <div className={styles.buttons}>
                        <input className={styles.submitButton} type="submit" value="Submit"/>
                        <button className={styles.cancelButton} onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GatheringCreationPopup;