import React, { useEffect, useState } from "react";
import "./TodoUpload.css";

const TodoUpload = ({ onUploadToggle, codes }) => {



    // useEffect(() => {
    //     if (selectedTodo) {
    //         setValue(selectedTodo.description);
    //     }
    // }, [selectedTodo])

    // async function onClick() {
    //     const code = await onUploadTodo().then(res => res)
    //     setCodes(code)
    //     console.log(codes, "test")
    // }


    return (
        <div>
            <div className="background2" onClick={onUploadToggle}></div>
            <div className="code">
                {codes}
            </div>
        </div >
    );
}
export default TodoUpload;