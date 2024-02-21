import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import "./TodoDownload.css";

const TodoDownload = ({ onDownloadToggle }) => {
    const [value, setValue] = useState("test");
    const onSubmit = () => {
        console.log("test")
    }

    return (
        <div>
            <div className="background3" onClick={onDownloadToggle}></div>
            <form onSubmit={onSubmit}>
                <input placeholder="Enter the code" value={value}></input>
                <button type="submit" className="addbutton">
                    <MdAddCircle />
                </button>
            </form>
        </div >
    );
}
export default TodoDownload;