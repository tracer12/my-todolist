import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import "./TodoDownload.css";

const TodoDownload = ({ onDownloadToggle, DownloadData }) => {
    const [value, setValue] = useState("");

    const onChange = e => { //입력한 값
        setValue(e.target.value);
        //console.log(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        //console.log(value)
        //console.log("test")
        DownloadData(value);
        onDownloadToggle();
    }

    return (
        <div>
            <div className="background3" onClick={onDownloadToggle}></div>
            <form onSubmit={onSubmit}>
                <input placeholder="Enter the code" value={value} onChange={onChange}></input>
                <button type="submit" className="addbutton">
                    <MdAddCircle />
                </button>
            </form>
        </div >
    );
}
export default TodoDownload;