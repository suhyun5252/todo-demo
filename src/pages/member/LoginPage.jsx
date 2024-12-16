import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postLoginMember } from "../../apis/member";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

function LoginPage() {
  const navigate = useNavigate();
  const { handleClickLogin } = useContext(LoginContext);
  const schema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요.")
      .email("올바른 이메일 형식이 아닙니다."),
    pw: yup
      .string()
      .required("비밀번호를 입력해주세요")
      .min(8, "비밀번호는 8자 이상입니다.")
      .max(16, "비밀번호는 16자까지 가능합니다.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
        "비밀번호는 영문, 숫자, 특수문자가 포함되어야 합니다.",
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  // 로그인 시도
  const onSubmit = async data => {
    // console.log(data);
    try {
      const result = await postLoginMember(data);
      if (result.data) {
        // 사용자가 로그인 했음을 관리
        handleClickLogin();
        // 화면이동
        navigate("/");
      } else {
        alert("로그인에 실패하셨습니다. 다시 시도해주세요");
      }
      console.log(errors);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이메일</label>
          <input {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>비밀번호</label>
          <input {...register("pw")} />
          {errors.pw && <p>{errors.pw.message}</p>}
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <div>
          <Link to="">이메일 찾기 /</Link>
          <Link to="">비밀번호 찾기 /</Link>
          <Link to="/member">회원가입</Link>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
