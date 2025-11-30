import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVoiceStore } from "../store/voiceStore";

type Step = "welcome" | "guide" | "recording" | "recordingPaused" | "complete" | "titleInput";

const VoiceRegisterPage = () => {
  const navigate = useNavigate();
  const { addVoice } = useVoiceStore();
  const [step, setStep] = useState<Step>("welcome");
  const [isRecording, setIsRecording] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [title, setTitle] = useState("");

  const sentences = [
    "어느 작은 마을에 호기심 많은 고양이가 살고 있었어. 고양이는 밤하늘의 반짝이는 별을 보고 마음을 빼앗겼지",
  ];

  // 자동으로 다음 단계로 넘어가기
  useEffect(() => {
    if (step === "welcome") {
      const timer = setTimeout(() => {
        setStep("guide");
      }, 2000);
      return () => clearTimeout(timer);
    } else if (step === "guide") {
      const timer = setTimeout(() => {
        setStep("recording");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // 클릭하면 바로 다음 단계로
  const handleScreenClick = () => {
    if (step === "welcome") {
      setStep("guide");
    } else if (step === "guide") {
      setStep("recording");
    }
  };

  // 녹음 버튼 클릭
  const handleRecord = () => {
    if (!isRecording) {
      // 녹음 시작
      setIsRecording(true);
    } else {
      // 녹음 중지 -> 일시정지 상태로
      setIsRecording(false);
      setStep("recordingPaused");
    }
  };

  // 다음으로 넘어가기
  const handleNext = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1);
      setStep("recording");
      setIsRecording(false);
    } else {
      // 마지막 문장 완료 -> complete
      setStep("complete");
    }
  };

  // 제목 입력 완료
  const handleSaveTitle = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    const newVoice = {
      id: `voice-${Date.now()}`,
      title: title.trim(),
      createdAt: new Date().toISOString(),
    };
    addVoice(newVoice);
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 py-8">
        {/* Welcome Step - 음성 학습을 시작하겠습니다 */}
        {step === "welcome" && (
          <div
            className="flex-1 flex flex-col items-center justify-center text-center w-full cursor-pointer"
            onClick={handleScreenClick}
          >
            <div className="bg-[#5A9BED] text-white px-6 py-3 rounded-[20px] mb-8 inline-block">
              <p className="text-sm font-medium">음성 학습을 시작하겠습니다!</p>
            </div>
            <img
              src="/img/Logo.png"
              alt="또랑또랑 로고"
              className="w-32 h-32 mb-6"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              음성등록은 약 5분정도 진행됩니다.
              <br />
              정확한 음성 등록을 위해 조용한 장소에서 진행해주세요.
            </p>
          </div>
        )}

        {/* Guide Step - 화면에 보이는 문장을 따라 읽어주세요 */}
        {step === "guide" && (
          <div
            className="flex-1 flex flex-col items-center justify-center text-center w-full cursor-pointer"
            onClick={handleScreenClick}
          >
            <div className="bg-[#5A9BED] text-white px-6 py-3 rounded-[20px] mb-8 inline-block">
              <p className="text-sm font-medium">화면에 보이는 문장을 따라 읽어주세요</p>
            </div>
            <img
              src="/img/Logo.png"
              alt="또랑또랑 로고"
              className="w-32 h-32 mb-6"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              음성등록은 약 5분정도 진행됩니다.
              <br />
              정확한 음성 등록을 위해 조용한 장소에서 진행해주세요.
            </p>
          </div>
        )}

        {/* Recording Step - 아래 문장을 따라 읽어주세요 */}
        {(step === "recording" || step === "recordingPaused") && (
          <div className="flex-1 flex flex-col items-center justify-between w-full">
            <div className="flex flex-col items-center text-center w-full">
              <div className="bg-[#5A9BED] text-white px-6 py-3 rounded-[20px] mb-12 inline-block">
                <p className="text-sm font-medium">아래 문장을 따라 읽어주세요</p>
              </div>

              <div className="w-full max-w-md mb-8">
                <p className="text-base font-medium text-gray-800 leading-relaxed border-b-2 border-gray-800 pb-3">
                  "{sentences[currentSentence]}"
                </p>
              </div>

              <button className="mb-4 px-6 py-2 bg-gray-300 text-gray-700 rounded-full text-sm flex items-center gap-2">
                <span>🔊</span>
                <span>음성으로 듣기</span>
              </button>
            </div>

            <div className="flex flex-col items-center w-full">
              {step === "recording" && !isRecording && (
                <>
                  <p className="text-xs text-gray-500 mb-6">아래 버튼을 눌러 말씀해주세요</p>
                  <button
                    onClick={handleRecord}
                    className="w-32 h-32 rounded-full flex items-center justify-center mb-8 transition bg-white border-4 border-[#5A9BED]"
                  >
                    <div className="w-16 h-16 bg-[#5A9BED] rounded-full"></div>
                  </button>
                </>
              )}

              {step === "recording" && isRecording && (
                <>
                  <p className="text-xs text-gray-500 mb-6">녹음중이에요</p>
                  <button
                    onClick={handleRecord}
                    className="w-32 h-32 rounded-full flex items-center justify-center mb-8 transition bg-[#5A9BED]"
                  >
                    <div className="w-12 h-12 bg-white rounded-sm"></div>
                  </button>
                </>
              )}

              {step === "recordingPaused" && (
                <button
                  onClick={handleNext}
                  className="w-full max-w-md py-4 bg-[#5A9BED] text-white rounded-[60px] font-semibold hover:bg-[#4A8BD6] transition"
                >
                  다음으로 넘어가기
                </button>
              )}
            </div>
          </div>
        )}

        {/* Complete Step - Title Input */}
        {step === "complete" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
            <div className="bg-[#5A9BED] text-white px-6 py-3 rounded-[20px] mb-12 inline-block">
              <p className="text-sm font-medium">음성 학습을 모두 완료하였습니다!</p>
              <p className="text-sm font-medium">등록하신 음성의 제목을 입력해주세요</p>
            </div>
            <img
              src="/img/Logo.png"
              alt="또랑또랑 로고"
              className="w-32 h-32 mb-12"
            />

            <div className="w-full max-w-md mb-8">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="음성1"
                className="w-full px-6 py-3 border-b-2 border-gray-300 bg-transparent text-center focus:outline-none focus:border-[#5A9BED] text-base"
              />
            </div>

            <button
              onClick={handleSaveTitle}
              className="w-full max-w-md py-4 bg-[#5A9BED] text-white rounded-[60px] font-semibold hover:bg-[#4A8BD6] transition"
            >
              완료하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRegisterPage;
