import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti";
import "./TodoInsert.css";

const TodoInsert = ({ onInsertToggle, onInsertTodo, selectedTodo, onRemove, onUpdate }) => {
    const [value, setValue] = useState("");
    //const [codes, setCodes] = useState("kkk");

    const onChange = e => { //입력한 값
        setValue(e.target.value);
        //console.log(e.target.value);
    };

    // async function onSubmit(e) {
    //     e.preventDefault(); // 새로고침 방지

    //     const code = await onInsertTodo(value).then(res => res) // 값을 받아와서 onInsertTodo에 넘겨줌
    //     //setCodes(code);
    //     //console.log(code, "test");

    //     setValue(""); // 다시 초기화 해주고
    //     onInsertToggle(); // 창을 닫음
    // }

    const onSubmit = (e) => {
        e.preventDefault(); // 새로고침 방지
        console.log("asdf")
        onInsertTodo(value);
        setValue("");
        onInsertToggle();
    }

    useEffect(() => {
        if (selectedTodo) {
            setValue(selectedTodo.description);
        }
    }, [selectedTodo])


    return (
        <div>
            <div className="background" onClick={onInsertToggle}></div>
            <form onSubmit={selectedTodo ? () => { onUpdate(selectedTodo.id, value) } : onSubmit}>
                <input placeholder="please type" value={value} onChange={onChange}></input>
                {selectedTodo ? (
                    <div className="rewrite">
                        <TiPencil onClick={() => onUpdate(selectedTodo.id, value)} />
                        <TiTrash onClick={() => onRemove(selectedTodo.id)} />
                    </div>
                ) : (<button type="submit" className="addbutton">
                    <MdAddCircle />
                </button>
                )}
            </form>
        </div >

    );
}
export default TodoInsert