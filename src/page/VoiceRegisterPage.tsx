import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVoiceStore } from "../store/voiceStore";

type Step = "welcome" | "guide1" | "guide2" | "recording" | "complete";

const VoiceRegisterPage = () => {
  const navigate = useNavigate();
  const { addVoice } = useVoiceStore();
  const [step, setStep] = useState<Step>("welcome");
  const [isRecording, setIsRecording] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);

  const sentences = [
    "안녕하세요. 반갑습니다. 오늘도",
    "좋은 하루 되세요. 감사합니다.",
    "이것은 가을 오후입니다."
  ];

  const handleNext = () => {
    if (step === "welcome") setStep("guide1");
    else if (step === "guide1") setStep("guide2");
    else if (step === "guide2") setStep("recording");
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // 가짜 녹음 2초
    setTimeout(() => {
      setIsRecording(false);
      if (currentSentence < sentences.length - 1) {
        setCurrentSentence(currentSentence + 1);
      } else {
        // 모든 문장 녹음 완료
        const newVoice = {
          id: `voice-${Date.now()}`,
          title: "내 음성",
          createdAt: new Date().toISOString(),
        };
        addVoice(newVoice);
        setStep("complete");
      }
    }, 2000);
  };

  const handleComplete = () => {
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-gray-700"
        >
          ←
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">
          음성 등록
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Welcome Step */}
        {step === "welcome" && (
          <div className="flex flex-col items-center text-center">
            <img
              src="/img/Logo.png"
              alt="또랑또랑 로고"
              className="w-24 h-24 mb-6"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              음성 등록을 시작합니다
            </h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-sm">
              다음 단계를 따라 음성을 등록해주세요.
              <br />
              3개의 문장을 읽으면 등록이 완료됩니다.
            </p>
            <button
              onClick={handleNext}
              className="w-full max-w-sm py-3 bg-[#4A90E2] text-white rounded-[60px] font-semibold hover:bg-[#357ABD] transition"
            >
              시작하기
            </button>
          </div>
        )}

        {/* Guide 1 */}
        {step === "guide1" && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">📱</div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              조용한 장소에서 녹음해주세요
            </h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-sm">
              음성 인식을 위해 주변 소음이 적은 곳에서
              <br />
              녹음을 진행해주세요. 마이크를 입 가까이 대세요.
            </p>
            <button
              onClick={handleNext}
              className="w-full max-w-sm py-3 bg-[#4A90E2] text-white rounded-[60px] font-semibold hover:bg-[#357ABD] transition"
            >
              다음
            </button>
          </div>
        )}

        {/* Guide 2 */}
        {step === "guide2" && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎤</div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              화면에 표시되는 문장을 읽어주세요
            </h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-sm">
              제시된 문장을 자연스럽게 읽어주세요.
              <br />
              3개의 문장을 모두 읽으면 등록이 완료됩니다.
            </p>
            <button
              onClick={handleNext}
              className="w-full max-w-sm py-3 bg-[#4A90E2] text-white rounded-[60px] font-semibold hover:bg-[#357ABD] transition"
            >
              녹음 시작
            </button>
          </div>
        )}

        {/* Recording Step */}
        {step === "recording" && (
          <div className="flex flex-col items-center w-full max-w-md">
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-500 mb-2">
                {currentSentence + 1} / {sentences.length}
              </p>
              <div className="p-6 bg-[#F5F5F5] rounded-[20px] mb-8">
                <p className="text-lg font-medium text-gray-800 leading-relaxed">
                  "{sentences[currentSentence]}"
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleStartRecording}
                disabled={isRecording}
                className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                  isRecording
                    ? "bg-red-500 animate-pulse"
                    : "bg-[#4A90E2] hover:bg-[#357ABD]"
                } transition`}
              >
                <div className="w-12 h-12 bg-white rounded-full"></div>
              </button>
              <p className="text-sm text-gray-600">
                {isRecording ? "녹음 중..." : "탭하여 녹음"}
              </p>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {step === "complete" && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">✅</div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              음성 등록이 완료되었습니다!
            </h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-sm">
              이제 번역 서비스를 사용할 수 있습니다.
              <br />
              감정이 반영된 음성으로 번역됩니다.
            </p>
            <button
              onClick={handleComplete}
              className="w-full max-w-sm py-3 bg-[#4A90E2] text-white rounded-[60px] font-semibold hover:bg-[#357ABD] transition"
            >
              완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRegisterPage;
