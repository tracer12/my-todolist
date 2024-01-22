
import { useState } from 'react';
import './App.css';
import Templete from './components/Templete';
import TodoList from './components/TodoList';
import { MdAddCircle } from 'react-icons/md';
import TodoInsert from './components/TodoInsert';

let nextId = 4;
const App = () => {
  const [selectedTodo, setSeletedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할일1",
      checked: true
    },
    {
      id: 2,
      text: "할일2",
      checked: false
    },
    {
      id: 3,
      text: "할일3",
      checked: true
    }
  ])
  const onInsertToggle = () => {
    if (selectedTodo) {
      setSeletedTodo(null);
    }
    setInsertToggle(prev => !prev)
  }
  const onInsertTodo = (text) => {
    if (text === '') {
      return alert('할 일을 입력해주세요');
    }
    else {
      const todo = {
        id: nextId,
        text,
        checked: false
      }
      setTodos(todos => todos.concat(todo));
      nextId++;
    }
  }

  const onCheckToggle = (id) => {
    setTodos(todos => todos.map(todo => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)))
  }

  const onChangeSelectedTodo = (todo) => {
    setSeletedTodo(todo);
  }

  const onRemove = id => {
    onInsertToggle();
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, text } : todo));
  }

  return (
    <Templete todoLength={todos.length}>
      <TodoList todos={todos}
        onChangeSelectedTodo={onChangeSelectedTodo}
        onInsertToggle={onInsertToggle}
        onCheckToggle={onCheckToggle}
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
