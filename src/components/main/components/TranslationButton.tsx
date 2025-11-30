interface TranslationButtonProps {
  onOpen: () => void;
}

const TranslationButton = ({ onOpen }: TranslationButtonProps) => {
  return (
    <button
      onClick={onOpen}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-[250px] h-[65px] rounded-full bg-[#4A90E2] flex justify-center items-center text-white text-xl font-semibold hover:bg-[#357ABD] transition shadow-lg"
    >
      번역하기
    </button>
  );
};

export default TranslationButton;
