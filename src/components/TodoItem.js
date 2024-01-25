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
    const { id, text, checked } = todo;

    return (
        <div
            className="TodoItem"
            draggable
            onDragStart={(e) => {
                dragItem.current = id;
            }}
            onDragEnter={(e) => {
                dragOverItem.current = id;
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className={checked ? "content" : "nocontent"}>
                {checked ? (
                    <MdCheckBox onClick={() => onCheckToggle(id)} />
                ) : (
                    <MdCheckBoxOutlineBlank onClick={() => onCheckToggle(id)} />
                )}
                <div
                    className="text"
                    onClick={() => {
                        onChangeSelectedTodo(todo);
                        onInsertToggle();
                    }}
                >
                    {text}
                </div>
            </div>
        </div>
    );
};

export default TodoItem;