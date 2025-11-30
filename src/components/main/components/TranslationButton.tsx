import { useNavigate } from "react-router-dom";

const TranslationButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/translate")}
      className="absolute bottom-[35px] z-10 w-[297px] h-[75px] mx-auto rounded-[80px] bg-[#787878] flex justify-center items-center text-white text-2xl font-semibold hover:bg-[#5A5A5A] transition"
    >
      번역하기
    </button>
  );
};

export default TranslationButton;
