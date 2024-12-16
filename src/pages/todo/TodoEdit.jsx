import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";
// import { TODO_MOCK_DATA } from "../../constants/mockdata";

function TodoEdit() {
  const { todoList, updateTodo } = useContext(TodoContext);
  //  useState 로 화면 리랜더링

  const [formData, setFormData] = useState({});
  //  Params 로 id를 추출하세요.
  const { id } = useParams();
  const navigate = useNavigate();

  const getTodo = () => {
    // id를 이용해서 mockdata에서 필요로 한 내용 추출
    const findData = todoList.filter(item => item.id === parseInt(id));
    const findTodo = findData[0];
    console.log(findTodo);
    setFormData({ ...findTodo });
    // 화면에 리랜더링 출력
  };

  const handleChange = e => {
    const { value, name, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateTodo(formData);
    alert("내용이 수정되었습니다.");
    navigate(`/todo/detail?id=${formData.id}`);
  };

  const handleClickBack = () => {
    navigate(`/todo/detail?id=${formData.id}`);
  };

  //  useEffect 에서 id 를 이용해서 출력할 내용 추출
  useEffect(() => {
    getTodo();
    return () => {};
  }, []);
  return (
    <div>
      <h1>TodoEdit</h1>

      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="author">작성자</label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            readOnly
            disabled
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            type="text"
            name="content"
            id="content"
            value={formData.content}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="date">날짜</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="complete">완료여부</label>
          <input
            type="checkbox"
            name="complete"
            id="complete"
            checked={formData.complete === 1 ? true : false}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="privacy">공개여부</label>
          <input
            type="checkbox"
            name="privacy"
            id="privacy"
            checked={formData.privacy === 1 ? true : false}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <button type="submit">수정하기</button>
          <button
            type="button"
            onClick={() => {
              handleClickBack();
            }}
          >
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default TodoEdit;
