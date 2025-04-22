import styles from "./GatheringViewPopup.module.css";
import { getTags } from "../../api/data";
import { useState, useEffect } from "react";
import Select from "react-select"

const GatheringViewPopup = ({ isOpen, onClose, gathering }) => {
    const [selectedOptions, setSelectedOptions] = useState(gathering.Tags.map((tag) => ({value: tag, label: tag})));

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
                        <p>Time: {new Date(gathering.time).toLocaleString()}</p>
                    </div>
                    <div>
                        <p>Public: {gathering.isPublic === "true" ? "Yes" : "No"}</p>
                    </div>
                    <label htmlFor="tags">Tags: </label>
                    <Select 
                    name="tags" 
                    value={selectedOptions}
                    isdisabled = "true"
                    isClearable={false}
                    menuIsOpen={false}
                    isMulti
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={gathering.description} readOnly={true} isdisabled="true"></textarea>
                    <div className={styles.buttons}>
                        <button className={styles.cancelButton} onClick={handleClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GatheringViewPopup;