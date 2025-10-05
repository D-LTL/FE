import { useNavigate } from "react-router-dom";
import { requestLogin } from "../api/loginApi";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await requestLogin();
    if (data.access_token) {
      localStorage.setItem('accessToken', data.access_token);
    }

    navigate('/home');
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full max-w-sm mx-auto px-10 bg-white rounded-lg transition-opacity duration-700 form-fade-in"
      onSubmit={handleLogin}
    >
      <input
        type="text"
        placeholder="ID"
        className="w-full indent-1.5 mb-2 px-4 py-2 border border-gray-300 rounded-[60px] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#aaaaaa]"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full indent-1.5 mb-4 px-4 py-2 border border-gray-300 rounded-[60px] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#aaaaaa]"
      />
      <button
        type="submit"
        className="w-full text-sm font-semibold py-4 bg-[#5A5A5A] text-white rounded-[60px] mb-2"
      >
        Sign In
      </button>
      <button className="w-full text-xs font-light py-4 bg-white rounded-[60px]">
        회원가입
      </button>
    </form>
  );
};

export default LoginForm;
