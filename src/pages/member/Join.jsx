// form 을 state로 작동시키면 너무 많은 리랜더링이 일어난다
// 글자를 1개만 적어도 리랜더링이 발생한다.
// 작성 내용, 항목이 많으면 성능이슈 발생할 소지가 높다.
// 이를 위해 https://www.react-hook-form.com/ 사용

import styled from "@emotion/styled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { postMember } from "../../apis/member";
import { useNavigate } from "react-router-dom";

const ErrorP = styled.p`
  color: red;
  font-size: 12px;
`;

// yup 관련 설정
// 1. schema 를 먼저 실행한다.
const schema = yup.object({
  name: yup
    .string()
    .required("이름은 필수입니다.")
    .min(2, "이름은 최소 2자 이상입니다."),
  email: yup
    .string()
    .required("이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
  password: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "비밀번호는 8자 이상입니다.")
    .max(16, "비밀번호는 16자까지 가능합니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "비밀번호는 영문, 숫자, 특수문자가 포함되어야 합니다.",
    ),

  passwordconfirm: yup
    .string()
    .required("비밀번호 확인을 입력해주세요")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),

  policy: yup.boolean().oneOf([true], "이용약관에 동의해 주세요"),
});

// 2. schema 가 만들어지면 hookform 과 연결한다.(resolver)
// 전화번호에 -를 붙여줌
// 유틸 폴더에 모아두고 쓰기
const formatPhoneNumber = value => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

// Daum Post 적용하기
// npm i react-daum-postcode

function Join() {
  const navigate = useNavigate();
  // register : 입력창에 훅폼을 등록한다
  // handleSubmit : 입력창에 내용을 입력 후 전송 실행시 처리
  // formState: { errors } : 폼의 에러상태를 이용해서 유효성 검사 적용하기
  // defaultValue : form 태그의 요소에 값 리셋하기
  // reset : form 태그의 요소에 초기값 셋팅하기

  // mode: 원하는 시점
  // - onChange  :  즉시, 즉시, 유효성 검사실행하기
  // - onBlur  :  사용자가 폼 외부를 클릭한 경우 검사실행하기
  // - onSubmit :  실행시에만 폼 유효성 검사실행하기
  // - all : onBlur 와 onChange 모두 포함

  // trigger : 초기 화면 출력시 폼 유효성 검사 실행하기

  // setValue : 강제로 폼의 값을 대입하기

  // Yup 적용해보기
  // npm i yup @hookform/resolvers

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger, // 유효성 검사 즉시 실행
    formState: { errors },
  } = useForm({
    defaultValue: {
      name: "",
      email: "",
      password: "",
      passwordconfirm: "",
      birthday: "",
      gender: "",
      phone: "",
      addr: {
        postcode: "",
        basic: "",
        detail: "",
      },
      policy: false,
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  // 전송데이터
  const onSubmit = async data => {
    try {
      // 전화번호 - 빼고 번호만 넘기기
      // console.log("전송시 데이터 ", data);
      const sendData = { ...data, phone: data.phone.replaceAll("-", "") };
      // console.log("전송시 데이터 sendData ", sendData);
      const result = await postMember(sendData);
      // console.log(result);
      if (result.data) {
        // 로그인 창으로 이동
        navigate("/login");
      } else {
        // 회원가입 다시 시도하도록 유도
        alert("회원가입을 다시 시도해주세요.");
      }
    } catch (error) {
      console.log("회원가입 실패", error);
    }
  };

  //   유효성 검사 즉시 실행
  useEffect(() => {
    // trigger();
  }, [trigger]);

  // Daum Post 적용
  // 1단계 : 외부 자바스크립트를 불러들여서 사용하는 방법
  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 2단계 : 선택시 주소 입력창 팝업창 띄우기
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        // 우편번호와 기본주소 입력
        setValue("addr.postcode", data.zonecode);
        setValue("addr.basic", data.address);

        // 상세주소 입력 필드로 포커스 이동
        document.querySelector('input[name="addr.detail"]').focus();
      },
    }).open();
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>회원가입</h1>x
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이름</label>
          <input {...register("name")} />
          {/* name이 없을때 error 내용 출력 */}
          {errors.name && <ErrorP>{errors.name.message}</ErrorP>}
          {/* {errors.name && <p>{`${errors.name.message}`}</p>} */}
        </div>
        <div>
          <label>이메일</label>
          <input {...register("email")} />
          {/* email이 없을때 error 내용 출력 */}
          {errors.email && <ErrorP>{errors.email.message}</ErrorP>}
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" {...register("password")} />
          {/* password이 없을때 error 내용 출력 */}
          {errors.password && <ErrorP>{errors.password.message}</ErrorP>}
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="password" {...register("passwordconfirm")} />
          {/* passwordconfirm 없을때 error 내용 출력 */}
          {errors.passwordconfirm && (
            <ErrorP>{errors.passwordconfirm.message}</ErrorP>
          )}
        </div>
        <div>
          <label>생년월일</label>
          <input type="date" {...register("birthday")} />
          {errors.birthday && <ErrorP>{errors.birthday.message}</ErrorP>}
        </div>
        <div>
          <label>성별</label>
          <select {...register("gender")}>
            <option value="">선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
        </div>
        <div>
          <label>전화번호</label>
          <input
            type="tel"
            {...register("phone")}
            onChange={e => {
              const tempPhone = formatPhoneNumber(e.target.value);
              //   console.log(tempPhone);
              //   setValue : hookform 의 기능 중 강제로 값을 대입하기
              setValue("phone", tempPhone);
            }}
          />
          {errors.phone && <ErrorP>{errors.phone.message}</ErrorP>}
        </div>
        <div>
          <label>우편번호</label>
          <input placeholder="12345" {...register("addr.postcode")} />
          <button
            onClick={() => {
              handleAddressSearch();
            }}
          >
            우편번호 찾기
          </button>
        </div>
        <div>
          <label>주소</label>
          <input placeholder="기본주소" {...register("addr.basic")} />
        </div>
        <div>
          <label>상세주소</label>
          <input placeholder="상세주소" {...register("addr.detail")} />
        </div>
        <div>
          <div>
            <div style={{ height: 80, overflowX: "hidden", overflowY: "auto" }}>
              <h3>회원약관동의</h3>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Perferendis non repellat quisquam architecto alias aspernatur
                iste quis nemo numquam deserunt aperiam beatae laudantium, autem
                sequi doloribus temporibus quibusdam reiciendis corrupti. Magni
                consectetur ea maxime architecto soluta amet omnis dicta, id
                perferendis nihil sed quos similique fuga minima animi possimus
                a! Consequuntur error nobis perspiciatis sint ad, a eveniet ipsa
                laudantium? Deleniti veniam provident sunt similique enim.
              </span>
            </div>
          </div>
          <input type="checkbox" {...register("policy")} />
          <label>이용약관에 동의합니다.</label>
          {errors.policy && <ErrorP>{errors.policy.message}</ErrorP>}
        </div>
        <div>
          <input
            type="button"
            onClick={() => reset()}
            value="Custom Reset Field Values & Errors"
          />
          <button type="submit">제출하기</button>
        </div>
      </form>
    </div>
  );
}
export default Join;
