import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import TodoIndex from "./pages/todo/Index";
import TodoDetail from "./pages/todo/TodoDetail";
import TodoEdit from "./pages/todo/TodoEdit";
import TodoAdd from "./pages/todo/TodoAdd";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { TODO_MOCK_DATA } from "./constants/mockdata";
import { useState } from "react";

// 내일 LocalStrage 와 React Context 로 알면 된다.
let originData = [...TODO_MOCK_DATA];
// 수정이 일어나는 곳에 props로 전달한다.

function App() {
  const [countId, setCountId] = useState(originData.length + 1);
  const [todoList, setTodoList] = useState(originData);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="todo">
            <Route
              index
              element={
                <TodoIndex todoList={todoList} setTodoList={setTodoList} />
              }
            />
            <Route
              path="add"
              element={
                <TodoAdd
                  todoList={todoList}
                  setTodoList={setTodoList}
                  countId={countId}
                  setCountId={setCountId}
                />
              }
            />
            <Route path="detail" element={<TodoDetail todoList={todoList} />} />
            <Route
              path="edit/:id"
              element={
                <TodoEdit todoList={todoList} setTodoList={setTodoList} />
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
