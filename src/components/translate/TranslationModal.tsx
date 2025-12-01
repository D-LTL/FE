import { useState, useEffect } from "react";
import type { HistoryItem } from "../../types/type";
import { useHistoryStore } from "../../store/historyStore";

interface TranslationModalProps {
  onClose: () => void;
  historyData?: HistoryItem | null;
}

const TranslationModal = ({ onClose, historyData }: TranslationModalProps) => {
  const { addHistoryItem } = useHistoryStore();
  const [isRecording, setIsRecording] = useState(false);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslated, setIsTranslated] = useState(false);
  const [sourceLang, setSourceLang] = useState("한국어");
  const [targetLang, setTargetLang] = useState("영어");
  const [isClosing, setIsClosing] = useState(false);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);

  const languages = ["한국어", "영어", "일본어", "중국어"];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSourceLangSelect = (lang: string) => {
    setSourceLang(lang);
    setShowSourceDropdown(false);
  };

  const handleTargetLangSelect = (lang: string) => {
    setTargetLang(lang);
    setShowTargetDropdown(false);
  };

  // 히스토리에서 진입한 경우 데이터 로드
  useEffect(() => {
    if (historyData) {
      setSourceText(historyData.sourceText);
      setTranslatedText(historyData.translatedText);
      setIsTranslated(true);
      // 저장된 언어 정보가 있으면 복원
      if (historyData.sourceLang) {
        setSourceLang(historyData.sourceLang);
      }
      if (historyData.targetLang) {
        setTargetLang(historyData.targetLang);
      }
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

    // 언어 쌍에 따른 번역
    let translated = "";

    // 한국어 -> 영어
    if (sourceLang === "한국어" && targetLang === "영어") {
      if (sourceText === "안녕하세요, 저는 세종대학교 출신입니다. 만나서 반갑습니다") {
        translated = "Hello, I'm from Sejong University. Nice to meet you.";
      } else {
        translated = translations[sourceText] || `[EN] ${sourceText}`;
      }
    }
    // 한국어 -> 일본어
    else if (sourceLang === "한국어" && targetLang === "일본어") {
      if (sourceText === "안녕하세요, 저는 세종대학교 출신입니다. 만나서 반갑습니다") {
        translated = "こんにちは、私は世宗大学出身です。お会いできて嬉しいです。";
      } else {
        translated = `[JP] ${sourceText}`;
      }
    }
    // 한국어 -> 중국어
    else if (sourceLang === "한국어" && targetLang === "중국어") {
      if (sourceText === "안녕하세요, 저는 세종대학교 출신입니다. 만나서 반갑습니다") {
        translated = "你好，我是世宗大学毕业的。很高兴见到你。";
      } else {
        translated = `[CN] ${sourceText}`;
      }
    }
    // 영어 -> 한국어
    else if (sourceLang === "영어" && targetLang === "한국어") {
      translated = `[KR] ${sourceText}`;
    }
    // 일본어 -> 한국어
    else if (sourceLang === "일본어" && targetLang === "한국어") {
      translated = `[KR] ${sourceText}`;
    }
    // 중국어 -> 한국어
    else if (sourceLang === "중국어" && targetLang === "한국어") {
      translated = `[KR] ${sourceText}`;
    }
    // 기타
    else {
      translated = translations[sourceText] || `[${targetLang}] ${sourceText}`;
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
      sourceLang: sourceLang,
      targetLang: targetLang,
    };
    addHistoryItem(newHistoryItem);
  };

  const handlePlayAudio = (_type: "source" | "translation") => {
    // 언어에 따라 오디오 파일 경로 설정
    let audioPath = "";
    if (targetLang === "영어") {
      audioPath = "/audio/en.mp3";
    } else if (targetLang === "일본어") {
      audioPath = "/audio/jp.mp3";
    } else if (targetLang === "중국어") {
      audioPath = "/audio/ch.mp3";
    } else if (targetLang === "한국어") {
      audioPath = "/audio/kr.mp3";
    }

    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        alert(`오디오 재생 실패: ${error.message}`);
      });
    }
  };

  const handleNewTranslation = () => {
    setSourceText("");
    setTranslatedText("");
    setIsTranslated(false);
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
        <div className="flex items-center justify-between px-12 py-4">
          {/* Source Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSourceDropdown(!showSourceDropdown)}
              className="px-4 py-2 bg-white text-base font-medium focus:outline-none flex items-center gap-2"
            >
              {sourceLang}
              <span className="text-xs">▼</span>
            </button>
            {showSourceDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-[10px] shadow-lg overflow-hidden z-[80] animate-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleSourceLangSelect(lang)}
                    className={`w-full px-4 py-2 text-left text-base hover:bg-[#F5F5F5] transition ${lang === sourceLang ? "bg-[#E8E8E8] font-semibold" : ""
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <button className="text-xl">⇄</button>

          {/* Target Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTargetDropdown(!showTargetDropdown)}
              className="px-4 py-2 bg-white text-base font-medium focus:outline-none flex items-center gap-2"
            >
              {targetLang}
              <span className="text-xs">▼</span>
            </button>
            {showTargetDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-[10px] shadow-lg overflow-hidden z-[80] animate-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleTargetLangSelect(lang)}
                    className={`w-full px-4 py-2 text-left text-base hover:bg-[#F5F5F5] transition ${lang === targetLang ? "bg-[#E8E8E8] font-semibold" : ""
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden px-6">
          {!isTranslated ? (
            <>
              {/* Input Area - Top Section */}
              <div className="flex items-center gap-2 py-4">
                <button className="w-13 h-[26px] rounded-xl bg-[#B5BDC7] flex items-center justify-center">
                  <span className="text-lg"><img src="./img/play_gray.png" alt="play" width={16} height={13} /></span>
                </button>
                <button className="w-13 h-[26px] rounded-xl bg-[#B5BDC7] flex items-center justify-center">
                  <span className="text-lg"><img src="./img/copy_gray.png" alt="play" width={17} height={17} /></span>
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
              <div className="flex flex-col items-center pb-8 gap-4 relative z-[70]">
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
                  <button className="w-[52px] h-[37px] rounded-xl bg-[#2C5282] flex items-center justify-center">
                    <span className="text-white text-lg"><img src="./img/copy_gray.png" alt="play" width={17} height={17} /></span>
                  </button>
                  <button
                    onClick={() => handlePlayAudio("translation")}
                    className="w-[52px] h-[37px] rounded-xl bg-[#4A90E2] flex items-center justify-center"
                  >
                    <span className="text-white text-lg"><img src="./img/play_gray.png" alt="play" width={16} height={13} /></span>
                  </button>
                </div>
              </div>

              {/* New Translation Button */}
              <div className="flex-1"></div>
              <div className="flex flex-col items-center pb-8 relative z-[70]">
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
        <div
          className="absolute bottom-0 w-full h-[150px] pointer-events-none z-[60]"
          style={{
            background: 'linear-gradient(to top, rgba(229, 255, 143, 0.5) 0%, rgba(229, 255, 143, 0) 100%)'
          }}
        />
      </div>
    </>
  );
};

export default TranslationModal;
