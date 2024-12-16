import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../../components/todo/TodoItem";
import { TodoContext } from "../../contexts/TodoContext";

function Index() {
  // Context 사용법
  const { todoList } = useContext(TodoContext);
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate("/todo/add");
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <h1>TodoList</h1>
      <ul>
        {todoList.map(item => {
          return (
            <li key={item.id}>
              <TodoItem item={item} />
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
