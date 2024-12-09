import { Link } from "react-router-dom";

const TodoItem = ({ item, deleteTodo }) => {
  // Link : 수정, 삭제 자세히 보기버튼
  // 제목, 작성자, 날자
  // 제목을 클릭함녀 상세페이지로 이동
  // 링크는 SearchParam 을 이용하여 주세요.
  return (
    <div>
      <Link to={`/todo/detail?id=${item.id}`}>
        <div>
          <p>{item.title}</p>
          <span>{item.content}</span>
        </div>
        <div>
          <p>{item.author}</p>
          <p>{item.date}</p>
        </div>
      </Link>
      <div className="btn-area">
        <button
          onClick={() => {
            deleteTodo(item.id);
          }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};
export default TodoItem;
