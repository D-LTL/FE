interface TranslationButtonProps {
  onOpen: () => void;
}

const TranslationButton = ({ onOpen }: TranslationButtonProps) => {
  return (
    <button
      onClick={onOpen}
      className="absolute bottom-[calc(45vh+20px)] left-1/2 transform -translate-x-1/2 z-30 w-[200px] h-[60px] rounded-full bg-[#4A90E2] flex justify-center items-center text-white text-lg font-semibold hover:bg-[#357ABD] transition shadow-lg"
    >
      번역하기
    </button>
  );
};

export default TranslationButton;
