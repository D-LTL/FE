import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVoiceStore } from "../store/voiceStore";

const VoiceRegisterPage = () => {
  const navigate = useNavigate();
  const { voices, addVoice } = useVoiceStore();
  const [isRecording, setIsRecording] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [title, setTitle] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    // 가짜 녹음 2초 후 종료
    setTimeout(() => {
      setIsRecording(false);
      setShowTitleInput(true);
    }, 2000);
  };

  const handleSaveVoice = () => {
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
    setTitle("");
    setShowTitleInput(false);
  };

  const handlePlayVoice = (id: string) => {
    setPlayingId(id);
    // 가짜 재생 2초
    setTimeout(() => {
      setPlayingId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <button
          onClick={() => navigate("/mypage")}
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
      <div className="flex-1 px-6 py-6">
        {/* 초기 안내 (음성이 없을 때만) */}
        {voices.length === 0 && !showTitleInput && (
          <div className="mb-8 p-6 bg-[#F5F5F5] rounded-[20px]">
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              최초 음성 등록 안내
            </h2>
            <p className="text-sm text-gray-600">
              번역에 사용할 음성을 등록해주세요. 등록된 음성은 번역 시 감정이
              반영된 음성으로 변환됩니다.
            </p>
          </div>
        )}

        {/* 녹음 영역 */}
        {!showTitleInput && (
          <div className="flex flex-col items-center justify-center py-12">
            <button
              onClick={handleStartRecording}
              disabled={isRecording}
              className={`w-32 h-32 rounded-full flex items-center justify-center ${
                isRecording
                  ? "bg-red-500 animate-pulse"
                  : "bg-[#5A5A5A] hover:bg-[#787878]"
              } transition`}
            >
              <div className="w-16 h-16 bg-white rounded-full"></div>
            </button>
            <p className="mt-6 text-sm text-gray-600">
              {isRecording ? "녹음 중..." : "버튼을 눌러 녹음을 시작하세요"}
            </p>
          </div>
        )}

        {/* 제목 입력 */}
        {showTitleInput && (
          <div className="mb-8">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              음성 제목 입력
            </h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 내 목소리"
              className="w-full px-4 py-3 border border-gray-300 rounded-[20px] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#5A5A5A]"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowTitleInput(false);
                  setTitle("");
                }}
                className="flex-1 py-3 border border-gray-300 rounded-[60px] text-gray-700"
              >
                취소
              </button>
              <button
                onClick={handleSaveVoice}
                className="flex-1 py-3 bg-[#5A5A5A] text-white rounded-[60px] font-semibold"
              >
                저장
              </button>
            </div>
          </div>
        )}

        {/* 등록된 음성 목록 */}
        {voices.length > 0 && (
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              등록된 음성 ({voices.length})
            </h3>
            <div className="space-y-3">
              {voices.map((voice) => (
                <div
                  key={voice.id}
                  className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-[20px]"
                >
                  <button
                    onClick={() => handlePlayVoice(voice.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      playingId === voice.id
                        ? "bg-[#787878]"
                        : "bg-[#5A5A5A]"
                    } transition`}
                  >
                    <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                  </button>
                  <div className="flex-1 ml-4">
                    <p className="text-sm font-medium text-gray-800">
                      {voice.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(voice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRegisterPage;
