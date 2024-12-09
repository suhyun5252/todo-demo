import { useEffect, useState } from "react";
// import { TODO_MOCK_DATA } from "../../constants/mockdata";
import TodoItem from "../../components/todo/TodoItem";
import { useNavigate } from "react-router-dom";

function Index({ todoList, setTodoList }) {
  const navigate = useNavigate();
  // useEffect 를 이용해서 할일 목록을 불러오시오.
  // 위에서 받아와서 삭제 const [todoList, setTodoList] = useState([]);
  // useState 를 이용해서 목록을 map으로 출력하시오.
  const deleteTodo = id => {
    // 할일 목록 한개를 삭제하기
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    alert(`${id} 삭제!!`);
  };
  const handleClickAdd = () => {
    navigate("/todo/add");
  };
  useEffect(() => {
    // setTodoList([...TODO_MOCK_DATA]);
    return () => {};
  }, []);
  return (
    <div>
      <h1>TodoList</h1>
      <ul>
        {todoList.map(item => {
          return (
            <li key={item.id}>
              <TodoItem item={item} deleteTodo={deleteTodo} />
            </li>
          );
        })}
      </ul>

      <div>
        <button
          onClick={() => {
            handleClickAdd();
          }}
        >
          추가하기
        </button>
      </div>
    </div>
  );
}
export default Index;
