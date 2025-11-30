import { useState, useEffect } from "react";
import type { HistoryItem } from "../../types/type";

interface TranslationModalProps {
  onClose: () => void;
  historyData?: HistoryItem | null;
}

type InputMode = "voice" | "text";

const TranslationModal = ({ onClose, historyData }: TranslationModalProps) => {
  const [inputMode, setInputMode] = useState<InputMode>("voice");
  const [isRecording, setIsRecording] = useState(false);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslated, setIsTranslated] = useState(false);
  const [isPlayingSource, setIsPlayingSource] = useState(false);
  const [isPlayingTranslation, setIsPlayingTranslation] = useState(false);
  const [sourceLang, setSourceLang] = useState("한국어");
  const [targetLang, setTargetLang] = useState("영어");

  // 히스토리에서 진입한 경우 데이터 로드
  useEffect(() => {
    if (historyData) {
      setSourceText(historyData.sourceText);
      setTranslatedText(historyData.translatedText);
      setIsTranslated(true);
    }
  }, [historyData]);

  // Preset translations
  const translations: { [key: string]: string } = {
    "안녕하세요": "Hello",
    "감사합니다": "Thank you",
    "좋은 아침입니다": "Good morning",
    "만나서 반갑습니다": "Nice to meet you",
    "오늘 날씨가 좋네요": "The weather is nice today",
    "이 근처에 식당이 있나요": "Is there a restaurant nearby",
  };

  // Preset voice inputs (for fake STT)
  const presetVoiceInputs = [
    "안녕하세요",
    "감사합니다",
    "좋은 아침입니다",
    "만나서 반갑습니다",
  ];

  const handleVoiceRecord = () => {
    setIsRecording(true);
    // 2초 후 가짜 STT
    setTimeout(() => {
      setIsRecording(false);
      const randomText =
        presetVoiceInputs[Math.floor(Math.random() * presetVoiceInputs.length)];
      setSourceText(randomText);
    }, 2000);
  };

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      alert("번역할 텍스트를 입력해주세요.");
      return;
    }

    // Preset translation 또는 기본 번역
    const translated = translations[sourceText] || `Translated: ${sourceText}`;
    setTranslatedText(translated);
    setIsTranslated(true);
  };

  const handlePlayAudio = (type: "source" | "translation") => {
    if (type === "source") {
      setIsPlayingSource(true);
      setTimeout(() => setIsPlayingSource(false), 2000);
    } else {
      setIsPlayingTranslation(true);
      setTimeout(() => setIsPlayingTranslation(false), 2000);
    }
  };

  const handleReset = () => {
    setSourceText("");
    setTranslatedText("");
    setIsTranslated(false);
  };

  const handleNewTranslation = () => {
    setSourceText("");
    setTranslatedText("");
    setIsTranslated(false);
    setInputMode("voice");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[30px] z-50 h-[85vh] flex flex-col modal-slide-up">
        {/* Header */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <button onClick={onClose} className="text-2xl text-gray-700">
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">
            번역
          </h1>
          <button
            onClick={handleReset}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            초기화
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center px-6 py-4 bg-[#F5F5F5]">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-[10px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          >
            <option value="한국어">한국어</option>
            <option value="영어">영어</option>
            <option value="일본어">일본어</option>
            <option value="중국어">중국어</option>
          </select>
          <span className="mx-3 text-lg text-gray-600">⇄</span>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-[10px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          >
            <option value="영어">영어</option>
            <option value="한국어">한국어</option>
            <option value="일본어">일본어</option>
            <option value="중국어">중국어</option>
          </select>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Translation Display Area */}
          <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
            {/* Source Text */}
            <div className="p-4 bg-[#F5F5F5] rounded-[20px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600">
                  원문 ({sourceLang})
                </span>
                {sourceText && (
                  <button
                    onClick={() => handlePlayAudio("source")}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isPlayingSource ? "bg-[#787878]" : "bg-[#5A5A5A]"
                    } transition`}
                  >
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1"></div>
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-800 min-h-[60px]">
                {sourceText || "텍스트를 입력하거나 음성을 녹음하세요."}
              </p>
            </div>

            {/* Translated Text */}
            {isTranslated && (
              <div className="p-4 bg-[#EBEBEB] rounded-[20px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-600">
                    번역 ({targetLang})
                  </span>
                  <button
                    onClick={() => handlePlayAudio("translation")}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isPlayingTranslation ? "bg-[#787878]" : "bg-[#5A5A5A]"
                    } transition`}
                  >
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1"></div>
                  </button>
                </div>
                <p className="text-sm text-gray-800 min-h-[60px]">
                  {translatedText}
                </p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="px-6 py-4 border-t border-gray-200">
            {!isTranslated ? (
              <>
                {inputMode === "voice" ? (
                  <div className="flex flex-col items-center py-4">
                    <button
                      onClick={handleVoiceRecord}
                      disabled={isRecording}
                      className={`w-20 h-20 rounded-full flex items-center justify-center ${
                        isRecording
                          ? "bg-red-500 animate-pulse"
                          : "bg-[#5A5A5A] hover:bg-[#787878]"
                      } transition mb-3`}
                    >
                      <div className="w-10 h-10 bg-white rounded-full"></div>
                    </button>
                    <p className="text-xs text-gray-600">
                      {isRecording ? "녹음 중..." : "탭하여 녹음"}
                    </p>
                  </div>
                ) : (
                  <div>
                    <textarea
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      placeholder="번역할 텍스트를 입력하세요"
                      className="w-full px-4 py-3 border border-gray-300 rounded-[20px] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#5A5A5A] resize-none"
                      rows={3}
                    />
                  </div>
                )}

                {/* Mode Toggle & Translate Button */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      setInputMode(inputMode === "voice" ? "text" : "voice")
                    }
                    className="w-12 h-12 rounded-full bg-[#EBEBEB] flex items-center justify-center hover:bg-[#D4D4D4] transition"
                  >
                    {inputMode === "voice" ? (
                      <span className="text-xl">💬</span>
                    ) : (
                      <span className="text-xl">🎤</span>
                    )}
                  </button>
                  {sourceText && (
                    <button
                      onClick={handleTranslate}
                      className="flex-1 py-3 bg-[#4A90E2] text-white rounded-[60px] font-semibold hover:bg-[#357ABD] transition"
                    >
                      번역하기
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="py-4">
                <button
                  onClick={handleNewTranslation}
                  className="w-full py-3 bg-[#4A90E2] text-white rounded-[60px] font-semibold hover:bg-[#357ABD] transition"
                >
                  새 번역
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TranslationModal;
