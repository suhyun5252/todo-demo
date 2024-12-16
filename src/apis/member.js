import axios from "axios";

// 회원가입 API
export const postMember = async data => {
  console.log(data);
  try {
    // 보통 IP주소는 proxy로 대체 됩니다.
    const res = await axios.post("http://192.168.0.66:5000/member", data);
    console.log("회원가입 결과", res.data);
    // 리턴을 안하면 상황을 모른다 반드시 리턴하자!
    return res;
  } catch (error) {
    console.log(error);
    // 리턴을 안하면 상황을 모른다 반드시 리턴하자!
    return error;
  }
};

// Login API
export const postLoginMember = async data => {
  try {
    const res = await axios.post("http://192.168.0.66:5000/member", data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
