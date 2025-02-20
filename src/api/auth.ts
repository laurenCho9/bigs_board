import { Axios } from "./Axios"; // Axios.ts에서 가져오기

const signup = async (userData: {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await Axios.post("/auth/signup", userData);
    console.log("회원가입 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

const login = async (loginData: { username: string; password: string }) => {
  try {
    const response = await Axios.post("/auth/signin", loginData);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken); // 토큰 저장
    localStorage.setItem("refreshToken", refreshToken);
    console.log("로그인 성공");
  } catch (error) {
    console.error("로그인 실패:", error);
  }
};

export { signup, login };
