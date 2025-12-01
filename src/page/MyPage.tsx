import { useNavigate } from "react-router-dom";
import { useVoiceStore } from "../store/voiceStore";
import BottomGradient from "../components/common/BottomGradient";

const MyPage = () => {
  const navigate = useNavigate();
  const { voices, defaultVoiceId, setDefaultVoice } = useVoiceStore();

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <button
          onClick={() => navigate("/main")}
          className="text-2xl text-gray-700"
        >
          ←
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">
          마이페이지
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        {/* 음성 등록 버튼 */}
        <button
          onClick={() => navigate("/voice-register")}
          className="w-full py-4 mb-6 bg-[#5A5A5A] text-white rounded-[60px] font-semibold"
        >
          음성 등록
        </button>

        {/* 기본 음성 설정 */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            기본 음성 설정
          </h2>
          {voices.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              등록된 음성이 없습니다.
            </p>
          ) : (
            <div className="space-y-3">
              {voices.map((voice) => (
                <div
                  key={voice.id}
                  onClick={() => setDefaultVoice(voice.id)}
                  className={`flex items-center justify-between px-4 py-3 border rounded-[20px] cursor-pointer transition ${
                    defaultVoiceId === voice.id
                      ? "border-[#5A5A5A] bg-[#F5F5F5]"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        defaultVoiceId === voice.id
                          ? "border-[#5A5A5A]"
                          : "border-gray-300"
                      }`}
                    >
                      {defaultVoiceId === voice.id && (
                        <div className="w-3 h-3 rounded-full bg-[#5A5A5A]"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {voice.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(voice.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomGradient />
    </div>
  );
};

export default MyPage;
