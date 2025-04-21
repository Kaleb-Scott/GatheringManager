import styles from "./GatheringUpdatePopup.module.css";
import { getTags } from "../../api/data";
import { useState, useEffect } from "react";
import Select from "react-select"
import { createGathering, updateGathering } from "../../api/data";

const GatheringUpdatePopup = ({ onClose }, gathering) => {
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(gathering.tags);

    useEffect(() => {
        getAvailableTags();
    }, []);

    const handleChange = (selected) => {
        setSelectedOptions(selected || []);
    }

    async function getAvailableTags(params) {
        setAvailableTags(await getTags());
    }

    async function handleSubmit() {
        console.log("submit was run.");
        let form = document.popup;
        let tags = selectedOptions.map((tag) => tag.value)
        
        if(new Date(form.time.value) < Date().now) {
            alert("The time can not be set to something that has already past.");
            return;
        }

        let response = await updateGathering(form.name.value, form.time.value, form.description.value, tags, form.isPublic.value === "on");

        if(!codes) {
            alert("Sorry, your gathering could not be created.");
        } else {
            onClose(false);
            alert("Your gathering was successfully created.");
        }
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
                        <input type="text" name="name" id="name" value={gathering.name} required/>
                    </div>
                    <div className={styles.timeContainer}>
                        <label htmlFor="time">Time: </label>
                        <input className={styles.time} type="datetime-local" name="time" id="time" value={new Date(gathering.time).toLocaleString()} required/>
                    </div>
                    <div>
                        <label htmlFor="isPublic">Public: </label>
                        <input type="checkbox" name="isPublic" id="isPublic" checked={gathering.isPublic}/>
                    </div>
                    <label htmlFor="tags">Tags: </label>
                    <Select 
                    name="tags" 
                    options={availableTags.map((tag) => ({value: tag, label: tag}))} 
                    value={selectedOptions}
                    onChange={handleChange}
                    placeholder="Select tags..." required
                    isMulti
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={gathering.description} required></textarea>
                    <div className={styles.buttons}>
                        <input className={styles.submitButton} type="submit" value="Submit"/>
                        <button className={styles.cancelButton} onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GatheringUpdatePopup;