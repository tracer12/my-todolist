import React from "react";
import TodoItem from "./TodoItem";
import './TodoList.css';

const TodoList = ({ todos, onCheckToggle, onInsertToggle, onChangeSelectedTodo, handleSort, dragItem, dragOverItem }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => (
                <TodoItem todo={todo}
                    key={todo.id}
                    onCheckToggle={onCheckToggle}
                    onInsertToggle={onInsertToggle}
                    onChangeSelectedTodo={onChangeSelectedTodo}
                    handleSort={handleSort}
                    dragItem={dragItem}
                    dragOverItem={dragOverItem}
                />
            ))}
        </div>
    )
}

export default TodoList;
