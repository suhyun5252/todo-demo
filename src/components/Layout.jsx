import { useContext } from "react";
import Footer from "./basic/Footer";
import Header from "./basic/Header";
import { ThemeContext } from "../contexts/ThemeContext";

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ backgroundColor: theme }}>
      <Header />
      <main>{children}</main>
      <Footer>copyright 2024 by Lee</Footer>
    </div>
  );
};
export default Layout;
