
import { useState, useRef, useEffect } from 'react';
import './App.css';
import Templete from './components/Templete';
import TodoList from './components/TodoList';
import { MdAddCircle } from 'react-icons/md';
import { FaUpload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import TodoInsert from './components/TodoInsert';


let nextId = 5;
const App = () => {

  const token = "bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiU1VQRVJfQURNSU4iLCJhdWQiOiJQT0wtQkRCRWVqLUdqNUFudFpwcloiLCJpYXQiOjE3MDcxMjEwNzQsImlzcyI6ImFwaS5wb2wub3Iua3IiLCJleHAiOjE3MTQ4OTcwNzR9.1FQydJ7Hca2YRNjPKLshy7LQqbDKaf3QGGEcs57K5YqIsU2mUihA9SYbpE3B7Wdu27IlMLFpUfgxvmJQyY-IDA";
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const [selectedTodo, setSeletedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false); // 참 거짓 함수, 메인화면의 +버튼을 눌렀을때만 컴포넌트가 떠야되므로
  const [todos, setTodos] = useState(null)
  const [codes, setCodes] = useState("abc");


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
      )
      ;
  }, [])


  function fetchData(codes) {
    fetch('http://api.pol.or.kr:8080/api/todo-list/task/' + codes, {
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
  }




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
        id: "yumin-abc-" + nextId,
        description,
        startDate: "2024-02-14T08:10:45",
        endDate: "2024-02-14T08:10:45",
        isDone: false
      }
      // ex) todo.startDate 찍어보면 제대로 출력이 된다
      setTodos((preTodo) => ({ taskList: [...preTodo.taskList, todo] })) // 이 부분을 
      nextId++;
    }
  }

  async function onUploadTodo() { // 추가버튼 누르면 호출되는 함수(목록추가)

    const response = await fetch('https://api.pol.or.kr/api/todo-list/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        author: "asdf",
        taskList: Object.values(todos.taskList)
      }
      )
    }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response)
        return response
      })
    //.then(console.log(JSON.stringify({ author: "asdf", taskList: todos })));
    return response
  }

  // async function onInsertTodo(description) { // 추가버튼 누르면 호출되는 함수(목록추가)
  //   if (description === '') { // description이 제대로 넘어와서 출력도 되고 여기까진 실행이 됨
  //     return alert('할 일을 입력해주세요');
  //   }
  //   else {
  //     const id = ""
  //     const text = description
  //     const startDate = "2024-02-14T08:10:45"
  //     const endDate = "2024-02-14T08:10:45"
  //     const isDone = false

  //     const response = await fetch('https://api.pol.or.kr/api/todo-list/task', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token
  //       },
  //       body: JSON.stringify({
  //         author: "asdf",

  //         taskList: [
  //           {
  //             id: id,
  //             description: text,
  //             startDate: startDate,
  //             endDate: endDate,
  //             isDone: isDone,
  //           }
  //         ]
  //       }
  //       )
  //     }
  //     )
  //       .then(response => response.json())
  //       .then(response => {
  //         console.log(response)
  //         return response
  //       })

  //     //.then(response => response.json())
  //     //.then(response => console.log(response, "test"))
  //     // .then((code) => setCodes(code))
  //     //.then(console.log(codes))
  //     //.then(fetchData())
  //     return response
  //   }
  // }

  //useEffect(() => { fetchData(codes) }, [codes])


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
    //console.log(id);
    //setTodos(todos => todos && todos.filter(todo => todo.id !== id));
    setTodos((prevTodos) => {
      const updatedTaskList = prevTodos.taskList.filter((todo) =>
        todo.id !== id
      );

      return {
        ...prevTodos,
        taskList: updatedTaskList,
      };
    });
  };

  const onUpdate = (id, description) => { // id값이랑 text 받아서 호출당하면
    //console.log(text)
    //console.log(todos.taskList.id)
    onInsertToggle(); // 창닫고
    //setTodos(todos => todos.taskList.map(todo => todo.taskList.id === id ? { ...todo.taskList, text } : todo)); // 가져온 글자만 박아넣으면 된다.
    setTodos((prevTodos) => {
      const updatedTaskList = prevTodos.taskList.map((todo) =>
        todo.id === id ? { ...todo, description: description } : todo
      );

      return {
        ...prevTodos,
        taskList: updatedTaskList,
      };
    });
  }

  const handleSort = () => { // taskList 안에 객체들을 교환해야한다
    //dragItem이 end 될 때 처리하기
    let _todos = [...todos.taskList]; //todos의 taskList를 복사해서 _todos에 넣어준다
    //console.log(_todos)
    const todosId = _todos.map((ele) => ele.id); //ele의 id를 뽑기위한 배열 이려면 yumin-abc-0,1,2,3,4가 todoId에 뽑혀나옴
    //console.log(todosId);
    const dragItemIndex = todosId.indexOf(dragItem.current); //drag할 요소의 item 인덱스값이 들어감
    const dragOverItemIndex = todosId.indexOf(dragOverItem.current); //swap할 요소의 item 인덱스값이 들어감
    // console.log(dragItemIndex);
    // console.log(dragOverItemIndex);
    [_todos[dragItemIndex], _todos[dragOverItemIndex]] = [_todos[dragOverItemIndex], _todos[dragItemIndex],]; //es6문법, 두 인덱스 위치 바꿔주는
    // 문법인거 같다.
    dragItem.current = null;
    dragOverItem.current = null;

    //console.log(_todos)
    //console.log(_todos)
    setTodos((prevTodos) => {
      const updatedTaskList = _todos

      return {
        //...prevTodos,
        taskList: updatedTaskList,
      };
    });
  };



  return (
    <Templete todoLength={todos && todos.taskList.length}>
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
      <div className="upload-todo-button" onClick={onUploadTodo}/*이게 추가 컴포넌트 띄우는 부분*/>
        <FaUpload />
      </div>
      <div className="download-todo-button" onClick={onInsertToggle}/*이게 추가 컴포넌트 띄우는 부분*/>
        <FaDownload />
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
