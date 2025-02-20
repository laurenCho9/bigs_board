import { useState } from "react";
import { signup } from "../../api/auth"; // signup API 함수 불러오기

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "", // 이메일
    name: "", // 이름
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // 통합 에러 메시지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const handleData = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const { username, name, password, confirmPassword } = formData;

    // 이메일 유효성 검사
    if (!username.includes("@")) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    // 이름 유효성 검사
    if (name.length < 2) {
      setError("이름은 최소 2자 이상 입력해야 합니다.");
      return;
    }

    // 비밀번호 유효성 검사
    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signup({ username, name, password, confirmPassword });
      alert("회원가입 성공! 로그인 페이지로 이동해주세요.");
    } catch (err) {
      setError("회원가입 실패. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="gap-20" onSubmit={handleSubmit}>
        <h4 className="font-weight-700">회원가입</h4>

        <div className="flex-inline gap-12 label-input-box">
          <label>이메일:</label>
          <input
            type="email"
            name="username"
            value={formData.username}
            onChange={handleData}
            required
          />
        </div>
        <div className="flex-inline gap-12 label-input-box">
          <label>이름:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleData}
            required
          />
        </div>

        <div className="flex-inline gap-12 label-input-box">
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleData}
            required
          />
        </div>

        <div className="flex-inline gap-12 label-input-box">
          <label>비밀번호 확인:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleData}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="signup-button" type="submit" disabled={isLoading}>
          {isLoading ? "가입 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
