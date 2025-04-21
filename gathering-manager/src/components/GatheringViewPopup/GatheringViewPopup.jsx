import styles from "./GatheringUpdatePopup.module.css";
import { getTags } from "../../api/data";
import { useState, useEffect } from "react";
import Select from "react-select"

const GatheringViewPopup = ({ isOpen, onClose, gathering }) => {
    const [selectedOptions, setSelectedOptions] = useState(gathering.tags);

    function handleClose() {
        onClose(false);
    }

    return (
        <div className={styles.popupBackground}>
            <div className={styles.popupContainer}>
                <p>Gathering Information</p>
                <form className={styles.dataArea} name="popup">
                    <div>
                        <p>name: {gathering.name}</p>
                    </div>
                    <div className={styles.timeContainer}>
                        <p>Time {new Date(gathering.time).toLocaleString()}</p>
                    </div>
                    <div>
                        <p>Public: {gathering.isPublic === "true" ? "Yes" : "No"}</p>
                    </div>
                    <label htmlFor="tags">Tags: </label>
                    <Select 
                    name="tags" 
                    options={availableTags.map((tag) => ({value: tag, label: tag}))} 
                    value={selectedOptions}
                    onChange={handleChange}
                    placeholder="Select tags..." required
                    isDisabled
                    isClearable={false}
                    isMulti
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={gathering.description} isDisabled required></textarea>
                    <div className={styles.buttons}>
                        <button className={styles.cancelButton} onClick={handleClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GatheringViewPopup;