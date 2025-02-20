import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL; // .env에서 API URL 가져오기
const REFRESH_URL = import.meta.env.VITE_APP_REFRESH_TOKEN_URL;

const Axios = axios.create({
  baseURL: API_URL, // 기본 URL 설정
  withCredentials: true, // 쿠키 포함 요청
  timeout: 30000, // 30초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT 토큰 자동 추가 (요청 인터셉터)
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // 로컬스토리지에서 JWT 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 요청 헤더에 JWT 추가
  }
  return config;
});

// JWT 만료 시 자동 갱신 (응답 인터셉터)
Axios.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    if (error.response?.status === 401) {
      // 401 에러 (토큰 만료)
      console.log("토큰 만료됨, 갱신 시도");
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}${REFRESH_URL}`, {
            refreshToken,
          });
          localStorage.setItem("accessToken", data.accessToken); // 새 토큰 저장
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return Axios(error.config); // 원래 요청 재시도
        } catch (refreshError) {
          console.error("리프레시 토큰 갱신 실패, 재로그인 필요");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // 로그인 페이지로 이동
        }
      }
    }
    return Promise.reject(error);
  }
);

export { Axios };
