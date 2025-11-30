import { useNavigate } from "react-router-dom";

interface VoiceRegistrationModalProps {
  onClose: () => void;
}

const VoiceRegistrationModal = ({ onClose }: VoiceRegistrationModalProps) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    onClose();
    navigate("/voice-register");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-6">
        <div className="bg-white rounded-[20px] p-6 w-full max-w-sm popup-slide-up">
          <div className="flex flex-col items-center">
            <img
              src="/img/Logo.png"
              alt="또랑또랑 로고"
              className="w-16 h-16 mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
              음성등록
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              서비스 사용을 위해서는 음성을 먼저
              <br />
              등록해야 합니다. 지금 등록하시겠습니까?
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-[60px] font-medium hover:bg-gray-300 transition"
              >
                아니오
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 py-3 px-4 bg-[#4A90E2] text-white rounded-[60px] font-semibold hover:bg-[#357ABD] transition"
              >
                네
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceRegistrationModal;
