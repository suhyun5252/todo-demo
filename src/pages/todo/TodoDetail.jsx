import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { TODO_MOCK_DATA } from "../../constants/mockdata";

function TodoDetail({ todoList }) {
  // js로 패스 이동하기
  const navigate = useNavigate();
  // SearchParams 를 이용해서
  const [searchParams, _] = useSearchParams();
  const id = parseInt(searchParams.get("id"));
  // console.log("리랜더", id);
  const [todo, setTodo] = useState({});

  const getTodo = () => {
    // id를 이용해서 mockdata에서 필요로 한 내용 추출
    //  state 로수정
    const findData = todoList.filter(item => item.id === id);
    // console.log(findData);
    const findTodo = findData[0];
    console.log(findTodo);
    setTodo({ ...findTodo });
    // console.log(findTodo);
    // setTodo에 담고
    // 화면에 리랜더링 출력
    // console.log("리랜더", id);
  };

  const handleClickEdit = () => {
    // Link 말고 js로 이동하기
    // Link = a태그로 이동하는 것
    // navigate(`/todo/edit/${id}`);
    navigate(`/todo/edit/${todo.id}`);
  };

  useEffect(() => {
    getTodo();
    return () => {};
  }, []);
  return (
    <div>
      <h1>TodoDetail</h1>
      <div>
        <br />
        작성자 : {todo.author}
        <br />
        날짜 : {todo.date}
        <br />
        제목 : {todo.title}
        <br />
        내용 : {todo.content}
      </div>
      <div>
        <button
          onClick={() => {
            handleClickEdit();
          }}
        >
          수정하기
        </button>
        <button
          onClick={() => {
            navigate(`/todo`);
          }}
        >
          목록보기
        </button>
      </div>
    </div>
  );
}
export default TodoDetail;
