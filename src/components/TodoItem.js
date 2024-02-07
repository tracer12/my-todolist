import React, { useRef } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import "./TodoItem.css";

const TodoItem = ({
    todo,
    onCheckToggle,
    onInsertToggle,
    onChangeSelectedTodo,
    handleSort,
    dragItem,
    dragOverItem,
}) => {
    const { id, description, isDone } = todo;
    //console.log(id);

    return (
        <div
            className="TodoItem"
            draggable // 드래그를 가능하게 해주고
            onDragStart={(e) => { // 드래그가 시작된다면
                dragItem.current = id; // 현재 선택한 객체의 id값을 dragItem.current에 넣어주고
                //console.log(dragItem.current)
            }}
            onDragEnter={(e) => { // 두 객체가 겹쳤다면
                dragOverItem.current = id; // dragOverItem.current에 겹친것의 아이디를 넣어주고
            }}
            onDragEnd={handleSort} // 두 객체를 겹친 상태에서 놓으면 handleSort 시작
            onDragOver={(e) => e.preventDefault()}
        >
            <div className={isDone ? "content" : "nocontent"}>
                {isDone ? (<MdCheckBox onClick={() => onCheckToggle(id)} />) : (<MdCheckBoxOutlineBlank onClick={() => onCheckToggle(id)} />)}
                <div className="text" onClick={() => { onChangeSelectedTodo(todo); onInsertToggle(); }}>
                    {id}
                    <br />
                    {description}
                    <br />
                    {isDone ? "true" : "false"}
                </div>
            </div>
        </div>
    );
};

export default TodoItem;