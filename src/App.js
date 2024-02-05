
import { useState, useRef, useEffect } from 'react';
import './App.css';
import Templete from './components/Templete';
import TodoList from './components/TodoList';
import { MdAddCircle } from 'react-icons/md';
import TodoInsert from './components/TodoInsert';


let nextId = 4;
const App = () => {

  const token = "bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiU1VQRVJfQURNSU4iLCJhdWQiOiJQT0wtQkRCRWVqLUdqNUFudFpwcloiLCJpYXQiOjE3MDcxMjEwNzQsImlzcyI6ImFwaS5wb2wub3Iua3IiLCJleHAiOjE3MTQ4OTcwNzR9.1FQydJ7Hca2YRNjPKLshy7LQqbDKaf3QGGEcs57K5YqIsU2mUihA9SYbpE3B7Wdu27IlMLFpUfgxvmJQyY-IDA";

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const [selectedTodo, setSeletedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false); // 참 거짓 함수, 메인화면의 +버튼을 눌렀을때만 컴포넌트가 떠야되므로
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    fetch('http://api.pol.or.kr:8080/api/todo-list/task/abc', {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
      .then((response) => response.json())
      .then((data) =>
        setTodos(data)
        //console.log(data)
      );
  }, [])

  const onInsertToggle = () => { // insertToggle을 참 거짓으로 바꿔주는 함수
    if (selectedTodo) {
      setSeletedTodo(null);
    }
    setInsertToggle(prev => !prev)
  }

  const onInsertTodo = (description) => { // 추가버튼 누르면 호출되는 함수(목록추가)
    if (description === '') { // description이 제대로 넘어와서 출력도 되고 여기까진 실행이 됨
      return alert('할 일을 입력해주세요');
    }
    else {
      const todo = {
        id: nextId,
        description,
        startDate: " ",
        endDate: " ",
        isDone: false
      }
      setTodos(todos => todos?.taskList.concat(todo)); // 씨발 이부분이 문제인데 어떻게 고치지?
      nextId++;
    }
  }

  // const onCheckToggle = (id) => {
  //   setTodos(todos => todos.taskList.map(todo => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)))
  // }

  const onCheckToggle = (id) => {
    setTodos((prevTodos) => {
      const updatedTaskList = prevTodos.taskList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );

      return {
        ...prevTodos,
        taskList: updatedTaskList,
      };
    });
  };

  const onChangeSelectedTodo = (todo) => {
    setSeletedTodo(todo);
  }

  const onRemove = (id) => {
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
      <div className="add-todo-button" onClick={onInsertToggle}/*이게 추가 컴포넌트 띄우는 부분*/>
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
