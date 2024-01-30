
import { useState, useRef, useEffect } from 'react';
import './App.css';
import Templete from './components/Templete';
import TodoList from './components/TodoList';
import { MdAddCircle } from 'react-icons/md';
import TodoInsert from './components/TodoInsert';


let nextId = 4;
const App = () => {

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const [selectedTodo, setSeletedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    fetch('http://api.pol.or.kr:8080/api/todo-list/task/abc')
      .then((response) => response.json())
      .then((data) =>
        setTodos(data)
        //console.log(data)
      );
  }, [])

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSeletedTodo(null);
    }
    setInsertToggle(prev => !prev)
  }
  const onInsertTodo = (description) => {
    if (description === '') {
      return alert('할 일을 입력해주세요');
    }
    else {
      const todo = {
        id: nextId,
        description,
        isDone: false
      }
      setTodos(todos => todos.taskList.concat(todo));
      nextId++;
    }
  }

  const onCheckToggle = (id) => {
    setTodos(todos => todos.taskList.map(todo => (todo.id === id ? { ...todo, inDone: !todo.isDone } : todo)))
  }
  const onChangeSelectedTodo = (todo) => {
    setSeletedTodo(todo);
  }

  const onRemove = id => {
    onInsertToggle();
    setTodos(todos => todos && todos.taskList.filter(todo => todo.id !== id));
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos => todos && todos.taskList.map(todo => todo.id === id ? { ...todo, text } : todo));
  }

  const handleSort = () => {
    //dragItem이 end 될 때 처리하기
    let _todos = [...todos];
    const todosId = _todos.map((ele) => ele.id); //ele의 id를 뽑기위한 배열
    const dragItemIndex = todosId.indexOf(dragItem.current); //drag할 요소의 item
    const dragOverItemIndex = todosId.indexOf(dragOverItem.current); //swap할 요소의 item
    [_todos[dragItemIndex], _todos[dragOverItemIndex]] = [_todos[dragOverItemIndex], _todos[dragItemIndex],]; //es6문법
    dragItem.current = null;
    dragOverItem.current = null;
    setTodos(_todos);
    /*asdf */
  };



  return (
    <Templete /*todoLength={todos && todos.taskList.length}*/>
      <TodoList todos={todos}
        onChangeSelectedTodo={onChangeSelectedTodo}
        onInsertToggle={onInsertToggle}
        onCheckToggle={onCheckToggle}
        handleSort={handleSort}
        dragItem={dragItem}
        dragOverItem={dragOverItem}

      />
      <div className="add-todo-button" onClick={onInsertToggle}>
        <MdAddCircle />
      </div>
      {insertToggle &&
        <TodoInsert
          onInsertToggle={onInsertToggle}
          onInsertTodo={onInsertTodo}
          selectedTodo={selectedTodo}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />}
    </Templete>
  )
}

export default App;
