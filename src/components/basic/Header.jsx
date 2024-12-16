import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PiHeartDuotone } from "react-icons/pi";

const Header = () => {
  const { handleClickLogin, isLogin } = useContext(LoginContext);
  const { handleChangeTheme } = useContext(ThemeContext);
  return (
    <header>
      <Link to={"/"} style={{ color: "red" }}>
        <PiHeartDuotone />
        Home /
      </Link>
      <Link to={"/"}> About /</Link>
      <Link to={"/member"}> 회원가입 /</Link>
      <Link to={"/login"}> 로그인 /</Link>
      <Link to={"/schedule"}> 스케쥴 /</Link>
      <Link to={"/range"}> 일정 /</Link>
      <Link to={"/todo"}> Todo /</Link>
      <Link to={"/full"}> 스케쥴러 </Link>
      <button
        onClick={() => {
          handleClickLogin();
        }}
      >
        {isLogin ? "로그아웃" : "로그인"}
      </button>
      <button
        type="button"
        onClick={() => {
          handleChangeTheme();
        }}
      >
        테마변경
      </button>
    </header>
  );
};
export default Header;
