import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestLogin } from "../api/loginApi";
import { useAuthStore } from "../../../store/authStore";

const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setDebugInfo("로그인 시도 중...");

    try {
      setDebugInfo("API 요청 전송 중...");
      const data = await requestLogin({ id, password });
      setDebugInfo("로그인 성공! 토큰: " + data.access_token.substring(0, 20) + "...");

      login({ id, username: id }, data.access_token);
      navigate("/main");
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || "알 수 없는 오류";
      const statusCode = err?.response?.status || "N/A";
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      setDebugInfo(`에러 발생 - 상태코드: ${statusCode}, 메시지: ${errorMsg}`);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full max-w-sm mx-auto px-10 bg-white rounded-lg transition-opacity duration-700 form-fade-in"
      onSubmit={handleLogin}
    >
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full indent-1.5 mb-2 px-4 py-3 border-none rounded-[10px] bg-[#E3F2FD] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full indent-1.5 mb-2 px-4 py-3 border-none rounded-[10px] bg-[#E3F2FD] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="w-full flex items-center gap-2 mb-4 px-2">
        <input type="checkbox" id="remember" className="w-3 h-3" />
        <label htmlFor="remember" className="text-xs text-gray-600">
          Remember me
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
      {debugInfo && <p className="text-blue-600 text-xs mb-2 text-center">{debugInfo}</p>}
      <button
        type="submit"
        className="w-full text-sm font-semibold py-4 bg-[#4A90E2] text-white rounded-[60px] mb-2 hover:bg-[#357ABD] transition"
      >
        Sign In
      </button>
      <button
        type="button"
        className="w-full text-xs font-normal py-2 text-blue-500 hover:text-blue-700"
      >
        회원가입
      </button>
    </form>
  );
};

export default LoginForm;
