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
      {/* Backdrop with transparency */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-6">
        <div className="bg-white rounded-[20px] p-8 w-full max-w-sm popup-slide-up shadow-xl">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
              환영합니다!
            </h2>
            <p className="text-sm text-gray-700 text-center mb-8 leading-relaxed">
              사용을 위해 음성 등록이 필요합니다.
              <br />
              지금 바로 등록하시겠습니까?
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-[#E8E8E8] text-gray-700 rounded-[60px] font-medium hover:bg-[#D4D4D4] transition"
              >
                아니오
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 py-3 px-4 bg-[#4A90E2] text-white rounded-[60px] font-semibold hover:bg-[#357ABD] transition"
              >
                예
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceRegistrationModal;
