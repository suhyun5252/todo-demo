import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
// import { TODO_MOCK_DATA } from "../constants/mockdata";

// 1. context 생성하기
export const TodoContext = createContext();
// 예)
// UserContext.js : export const UserContext = createContext();
// ThemeContext.js : export const ThemeContext = createContext();
// LangContext.js : export const LangContext = createContext();
// BucketContext.js : export const BucketContext = createContext();

// Local Storage 여러가지 값이 보관되므로 구분용 Key가 필요해요.
const TODO_LS_KEY = "todos";
const TODO_SESSION_KEY = "todos_session";

const TODO_COOKIE_NAME = "todos_cookie";

//  2. Context 를 활용할 Provider 생성하기(공급한다)
export const TodoProvider = ({ children }) => {
  // 쿠키 라이브러리 사용
  const [cookies, setCookie, removeCookie] = useCookies([TODO_COOKIE_NAME]);
  // 3. 관리하고 싶은 state 및 state를 업데이트하는 기능을 모아둠
  // const [countId, setCountId] = useState(TODO_MOCK_DATA.length + 1);
  // const [todoList, setTodoList] = useState([...TODO_MOCK_DATA]);
  // const [countId, setCountId] = useState(0);
  const [todoList, setTodoList] = useState([]);

  //  1. todoList를 추가하는 기능
  const addTodo = formData => {
    const newTodoData = [...todoList, { ...formData, id: Date.now() }];
    setTodoList(newTodoData);
    // setCountId(prev => prev + 1);

    // 로컬에 저장 합당함
    // localStorage.setItem(TODO_LS_KEY, JSON.stringify([...todoList]));
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));

    // 세션에 저장 (웹브라우저 임시 보관)
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newTodoData]));

    // 쿠키에 저장(서버자료 보관이 아니라서 비추)
    // setCookie(name, value, [options]);
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };
  //  2. todoList에서 특정 todo를 제거하는 기능
  const deleteTodo = id => {
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    // 로컬 삭제
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newList]));
    alert(`${id} 글이 삭제!!`);

    // 세션 삭제
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newList]));

    // 쿠키 삭제
    setCookie(TODO_COOKIE_NAME, newList, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };
  //  3. todoList에서 특정 todo를 수정하는 기능
  const updateTodo = formData => {
    const newTodoData = todoList.map(item => {
      if (formData.id === item.id) {
        return formData;
      } else {
        return item;
      }
    });
    console.log("수정된 할일들", newTodoData);
    setTodoList(newTodoData);
    // 로컬 업데이트
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));

    // 세션 삭제
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newTodoData]));

    // 쿠키 업데이트
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  const resetTodo = () => {
    setTodoList([]);
    //로컬
    localStorage.clear(TODO_LS_KEY);

    // 세션삭제
    sessionStorage.clear(TODO_SESSION_KEY);

    // 쿠키에 리셋(서버자료 보관이 아니라서 비추)
    removeCookie(TODO_COOKIE_NAME);
  };

  // Context 가 화면에 출력될 때, Local Storage 에서 값을 읽어온다
  // 이때 key는 TODO_LS_KEY 에 담긴 값을 이용해서 가저옴
  useEffect(() => {
    // 웹브라우저 Local Starage 에 값을 읽어들임
    // 로컬 자료 읽기
    const todos = localStorage.getItem(TODO_LS_KEY);

    // 세션읽기
    const todoSession = sessionStorage.getItem(TODO_SESSION_KEY);

    // 로컬 자료일때
    if (todos) {
      // 있을때
      alert("기존 보관하던 데이터가 있습니다.");
      // 글자를 js 에서 사용할 수 있도록 반환하자
      // console.log(typeof todos);
      const datas = JSON.parse(todos);
      // console.log(typeof datas);
      // setCountId(datas.langth);
      setTodoList([...datas]);
    } else {
      // 없을때
      alert("없다 초기값 셋팅!!!@!!@!!!!!!!!");
      localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
      // setCountId(0);
    }

    // 세션 읽기
    if (todoSession) {
      const datas = JSON.parse(todoSession);
      setTodoList([...datas]);
    } else {
      sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify(todoList));
    }

    //  쿠키 읽기
    const todoCookie = cookies[TODO_COOKIE_NAME];
    if (todoCookie) {
      setTodoList(todoCookie);
    } else {
      setCookie(TODO_COOKIE_NAME, [], {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
    return () => {};
  }, []);

  // 4. Provider 에 value 에 원하는 기능 및 state 를 전달해줌

  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, deleteTodo, updateTodo, resetTodo }}
    >
      {/* 컴포넌트를 children 으로 주입 받는다. */}
      {children}
    </TodoContext.Provider>
  );
};
//  예)
// export const UserProvider = createContext();
// export const ThemeCProvider = createContext();
// export const LangProvider = createContext();
// export const BucketProvider = createContext();
