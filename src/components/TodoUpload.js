import React, { useEffect, useState } from "react";
import "./TodoUpload.css";

const TodoUpload = ({ onUploadToggle, onUploadTodo }) => {

    async function onClick(e) {
        e.preventDefault(); // 새로고침 방지
        const code = await onUploadTodo().then(res => res) // 값을 받아와서 onInsertTodo에 넘겨줌
        //setCodes(code);
        console.log(code, "test");
    }

    return (
        <div>
            <div className="background2" onClick={onUploadToggle}></div>
            <form>
                <div className="code" onClick={() => onClick}>asdf</div>
            </form>
        </div >
    );
}
export default TodoUpload;