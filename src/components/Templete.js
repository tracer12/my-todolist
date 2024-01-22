import React from "react";
import './Templete.css';
const Templete = ({ children, todoLength }) => {
    return (
        <div className="Templete">
            <div className="title">
                오늘의 할일({todoLength})
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
export default Templete;