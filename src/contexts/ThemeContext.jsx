import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const ThemeContext = createContext();
export const THEME_COOKIE_KEY = "theme_cookie";
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("pink");
  const [cookies, setCookie] = useCookies([THEME_COOKIE_KEY]);
  const handleChangeTheme = () => {
    const nowTheme = theme === "pink" ? "green" : "pink";
    setTheme(nowTheme);
    localStorage.setItem("theme", JSON.stringify(nowTheme));

    setCookie(THEME_COOKIE_KEY, nowTheme, {
      path: "/",
      maxAge: 1 * 24 * 3600,
    });
  };

  useEffect(() => {
    // 로컬
    const nowTheme = localStorage.getItem("theme");
    if (nowTheme) {
      setTheme(JSON.parse(nowTheme));
    } else {
      localStorage.setItem("theme", JSON.stringify(theme));
    }

    // 쿠키
    const themeCookie = cookies[THEME_COOKIE_KEY];
    if (themeCookie) {
      setCookie(themeCookie);
    } else {
      setCookie(THEME_COOKIE_KEY, theme, {
        path: "/",
        maxAge: 1 * 24 * 3600,
      });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
