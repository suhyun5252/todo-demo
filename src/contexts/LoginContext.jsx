import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const LOGIN_LS_KEY = "login";
export const LOGIN_SS_KEY = "login";
export const LOGIN_COOKIE_NAME = "login-cookie";
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [cookies, setCookie, removeCokie] = useCookies([LOGIN_COOKIE_NAME]);
  const [isLogin, setIsLogin] = useState(false);
  const handleClickLogin = () => {
    // if (isLogin === false) {
    //   setIsLogin(true);
    //   localStorage.setItem(LOGIN_LS_KEY, JSON.stringify(true));
    // }
    // if (isLogin) {
    //   setIsLogin(false);
    //   localStorage.setItem(LOGIN_LS_KEY, JSON.stringify(false));
    // }
    // 위 코드 한줄 표현
    setIsLogin(!isLogin);
    // 로컬
    localStorage.setItem(LOGIN_LS_KEY, JSON.stringify(!isLogin));
    //세션
    sessionStorage.setItem(LOGIN_SS_KEY, JSON.stringify(!isLogin));

    // 쿠키
    setCookie(LOGIN_COOKIE_NAME, !isLogin, {
      path: "/",
      maxAge: 1 * 24 * 3600,
    });
  };
  useEffect(() => {
    // 로컬 읽기
    const login = localStorage.getItem(LOGIN_LS_KEY);

    //세션
    const loginSS = sessionStorage.getItem(LOGIN_SS_KEY);

    // 쿠키 읽기
    const loginCookie = cookies[LOGIN_COOKIE_NAME];

    if (login) {
      setIsLogin(JSON.parse(false));
    } else {
      localStorage.setItem(LOGIN_LS_KEY, JSON.stringify(false));
    }
    //세션
    if (loginSS) {
      setIsLogin(JSON.parse(false));
    } else {
      sessionStorage.setItem(LOGIN_SS_KEY, JSON.stringify(false));
    }

    if (loginCookie) {
      setIsLogin(loginCookie);
    } else {
      setCookie(LOGIN_COOKIE_NAME, false, {
        path: "/",
        maxAge: 1 * 24 * 3600,
      });
    }
  }, []);

  return (
    <LoginContext.Provider value={{ isLogin, handleClickLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
