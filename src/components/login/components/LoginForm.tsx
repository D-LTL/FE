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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await requestLogin({ id, password });

      login({ id, username: id }, data.access_token);
      navigate("/main");
    } catch (err) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
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
        className="w-full indent-1.5 mb-2 px-4 py-2 border border-gray-300 rounded-[60px] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#aaaaaa]"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full indent-1.5 mb-4 px-4 py-2 border border-gray-300 rounded-[60px] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#aaaaaa]"
      />
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
      <button
        type="submit"
        className="w-full text-sm font-semibold py-4 bg-[#5A5A5A] text-white rounded-[60px] mb-2"
      >
        Sign In
      </button>
      <button
        type="button"
        className="w-full text-xs font-light py-4 bg-white rounded-[60px]"
      >
        회원가입
      </button>
    </form>
  );
};

export default LoginForm;
