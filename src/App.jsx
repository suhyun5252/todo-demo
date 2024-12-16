import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Join from "./pages/member/Join";
import TodoIndex from "./pages/todo/Index";
import TodoDetail from "./pages/todo/TodoDetail";
import TodoEdit from "./pages/todo/TodoEdit";
import TodoAdd from "./pages/todo/TodoAdd";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { TodoProvider } from "./contexts/TodoContext";
import { LoginProvider } from "./contexts/LoginContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoginPage from "./pages/member/LoginPage";
import Schedule from "./pages/calendar/Schedule";
import RangeSchedule from "./pages/calendar/RangeSchedule";
import Full from "./pages/calendar/Full";

function App() {
  return (
    <LoginProvider>
      <ThemeProvider>
        <TodoProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<About />} />
                {/* 회원가입 */}
                <Route path="/member" element={<Join />} />
                {/* 로그인 */}
                <Route path="/login" element={<LoginPage />} />
                {/* 스케줄 */}
                <Route path="/schedule" element={<Schedule />} />
                {/* 일정 */}
                <Route path="/range" element={<RangeSchedule />} />
                {/* Full calender 일정 */}
                <Route path="/full" element={<Full />} />

                <Route path="todo">
                  <Route index element={<TodoIndex />} />
                  <Route path="add" element={<TodoAdd />} />
                  <Route path="detail" element={<TodoDetail />} />
                  <Route path="edit/:id" element={<TodoEdit />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TodoProvider>
      </ThemeProvider>
    </LoginProvider>
  );
}
export default App;
