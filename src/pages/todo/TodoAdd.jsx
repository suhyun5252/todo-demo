import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { TODO_MOCK_DATA } from "../../constants/mockdata";
const initData = {
  id: 0,
  title: "",
  content: "",
  author: "",
  date: "",
  complete: 0,
  privacy: 0,
};
// TodoEdit 에서 복붙해서 사용
function TodoAdd({ todoList, setTodoList, countId, setCountId }) {
  //  useState 로 화면 리랜더링
  const [formData, setFormData] = useState(initData);
  //  Params 로 id를 추출하세요.
  // console.log(id);
  const navigate = useNavigate();

  const handleChange = e => {
    const { value, name, type, checked } = e.target;
    // console.log(name, value);

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const postTodo = () => {
    console.log("formData", formData);
    // const originData = [...todoList];

    console.log("formData", { ...formData, id: countId });
    const newTodoData = [...todoList, { ...formData, id: countId }];
    setTodoList(newTodoData);
    setCountId(++countId);
  };

  const handleSubmit = e => {
    e.preventDefault();
    postTodo();
    alert("내용이 추가되었습니다.");
    navigate(`/todo`);
  };

  const handleClickBack = () => {
    navigate(`/todo`);
  };

  //  useEffect 에서 id 를 이용해서 출력할 내용 추출
  useEffect(() => {
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
          <button type="submit">등록하기</button>
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
export default TodoAdd;
