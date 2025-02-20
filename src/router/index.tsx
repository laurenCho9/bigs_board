import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Board from "../pages/board/Board";
import BoardDetail from "../pages/board/BoardDetail";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board-detail" element={<BoardDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
