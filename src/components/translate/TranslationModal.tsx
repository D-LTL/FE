import { useState, useEffect } from "react";
import type { HistoryItem } from "../../types/type";
import { useHistoryStore } from "../../store/historyStore";

interface TranslationModalProps {
  onClose: () => void;
  historyData?: HistoryItem | null;
}

type InputMode = "voice" | "text";

const TranslationModal = ({ onClose, historyData }: TranslationModalProps) => {
  const { addHistoryItem } = useHistoryStore();
  const [inputMode, setInputMode] = useState<InputMode>("voice");
  const [isRecording, setIsRecording] = useState(false);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslated, setIsTranslated] = useState(false);
  const [isPlayingSource, setIsPlayingSource] = useState(false);
  const [isPlayingTranslation, setIsPlayingTranslation] = useState(false);
  const [sourceLang, setSourceLang] = useState("한국어");
  const [targetLang, setTargetLang] = useState("영어");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

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
    if (!isRecording) {
      // 녹음 시작
      setIsRecording(true);
    } else {
      // 녹음 중지 - 텍스트 입력
      setIsRecording(false);
      setSourceText("안녕하세요, 저는 세종대학교 출신입니다. 만나서 반갑습니다");
    }
  };

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      alert("번역할 텍스트를 입력해주세요.");
      return;
    }

    // 특정 텍스트에 대한 번역
    let translated = "";
    if (sourceText === "안녕하세요, 저는 세종대학교 출신입니다. 만나서 반갑습니다") {
      translated = "Hello, I'm from Sejong University. Nice to meet you.";
    } else {
      translated = translations[sourceText] || `Translated: ${sourceText}`;
    }

    setTranslatedText(translated);
    setIsTranslated(true);

    // 히스토리에 자동 저장
    const newHistoryItem: HistoryItem = {
      id: `history-${Date.now()}`,
      sourceText: sourceText,
      translatedText: translated,
      sourceAudioUrl: "",
      translatedAudioUrl: "",
      createdAt: new Date().toISOString(),
      title: sourceText.length > 20 ? sourceText.substring(0, 20) + "..." : sourceText,
    };
    addHistoryItem(newHistoryItem);
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
      {/* Modal */}
      <div className={`fixed inset-0 bg-white z-50 flex flex-col ${isClosing ? 'modal-slide-down' : 'modal-slide-up'}`}>
        {/* Header */}
        <div className="flex items-center px-6 py-4">
          <button onClick={handleClose} className="text-2xl text-gray-400">
            ✕
          </button>
          <div className="flex-1" />
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center px-6 py-4 gap-4">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="px-4 py-2 bg-white border-none text-base font-medium focus:outline-none appearance-none"
          >
            <option value="영어">영어</option>
            <option value="한국어">한국어</option>
            <option value="일본어">일본어</option>
            <option value="중국어">중국어</option>
          </select>
          <button className="text-xl">⇄</button>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="px-4 py-2 bg-white border-none text-base font-medium focus:outline-none appearance-none"
          >
            <option value="한국어">한국어</option>
            <option value="영어">영어</option>
            <option value="일본어">일본어</option>
            <option value="중국어">중국어</option>
          </select>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden px-6">
          {!isTranslated ? (
            <>
              {/* Input Area - Top Section */}
              <div className="flex items-center gap-2 py-4">
                <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg">🔊</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg">📋</span>
                </button>
              </div>

              {/* Text Display Area */}
              <div className="flex-1 flex flex-col justify-start">
                <div className="text-left">
                  <p className="text-base text-gray-800 leading-relaxed">
                    {sourceText || "지금 말하세요..."}
                  </p>
                </div>
              </div>

              {/* Recording Button Area */}
              <div className="flex flex-col items-center pb-8 gap-4">
                {!isRecording && !sourceText && (
                  <button
                    onClick={handleVoiceRecord}
                    className="w-32 h-32 rounded-full flex items-center justify-center transition bg-white border-4 border-[#4A90E2]"
                  >
                    <div className="w-16 h-16 bg-[#4A90E2] rounded-full"></div>
                  </button>
                )}

                {isRecording && (
                  <button
                    onClick={handleVoiceRecord}
                    className="w-32 h-32 rounded-full flex items-center justify-center transition bg-[#4A90E2]"
                  >
                    <div className="w-12 h-12 bg-white rounded-sm"></div>
                  </button>
                )}

                {sourceText && !isRecording && (
                  <button
                    onClick={handleTranslate}
                    className="w-full max-w-md py-4 bg-[#4A90E2] text-white rounded-[60px] font-semibold hover:bg-[#357ABD] transition"
                  >
                    번역하기
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Source Text */}
              <div className="py-4">
                <p className="text-base text-gray-800 leading-relaxed mb-8">
                  {sourceText}
                </p>
              </div>

              {/* Translated Text */}
              <div className="p-6 bg-[#E8E8E8] rounded-[20px]">
                <p className="text-lg font-medium text-gray-900 mb-3">
                  {translatedText}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {translatedText}
                </p>
                <div className="flex justify-end gap-3">
                  <button className="w-12 h-12 rounded-full bg-[#2C5282] flex items-center justify-center">
                    <span className="text-white text-lg">📋</span>
                  </button>
                  <button
                    onClick={() => handlePlayAudio("translation")}
                    className="w-12 h-12 rounded-full bg-[#4A90E2] flex items-center justify-center"
                  >
                    <span className="text-white text-lg">🔊</span>
                  </button>
                </div>
              </div>

              {/* New Translation Button */}
              <div className="flex-1"></div>
              <div className="flex flex-col items-center pb-8">
                <button
                  onClick={handleNewTranslation}
                  className="w-32 h-32 rounded-full flex items-center justify-center transition bg-white border-4 border-[#4A90E2]"
                >
                  <div className="w-16 h-16 bg-[#4A90E2] rounded-full"></div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TranslationModal;
