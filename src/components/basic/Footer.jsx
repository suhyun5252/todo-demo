import { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";

const Footer = ({ children }) => {
  const { resetTodo } = useContext(TodoContext);
  return (
    <div>
      <button type="button" onClick={() => resetTodo()}>
        Todo 초기화
      </button>
      <div>{children}</div>
    </div>
  );
};
export default Footer;
