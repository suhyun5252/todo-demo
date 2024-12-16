import { useCookies } from "react-cookie";

export const useCookiesUtil = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  /**
   * 쿠키관리 유틸리티 함수
   * `Get : 쿠키값 읽기`
   * @param {string} name -쿠키이름
   */

  const getCookie = name => {
    const [cookies] = useCookies({ name });
    return cookies[name];
  };

  /**
   * 쿠키관리 유틸리티 함수
   * `Set : 쿠키값 쓰기`
   * @param {string} name - 쿠키이름
   * @param {any} value - 저장 데이터
   * @param {string} path - 저장 경로 (기본 '/')
   * @param {number} maxAge - 유효시간 (기본 1시간)
   */

  const setCookie = (name, value, path = "/", maxAge = 1) => {};

  /**
   * 쿠키관리 유틸리티 함수
   * `Remove : 쿠키값 삭제`
   *  @param {string} name - 쿠키이름
   */

  const removeCookie = name => {};
};
