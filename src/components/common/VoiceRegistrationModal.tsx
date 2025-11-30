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
      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 px-6 bg-black bg-opacity-5"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-[20px] p-8 w-full max-w-sm popup-slide-up shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
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
                onClick={handleRegister}
                className="flex-1 py-3 px-4 bg-[#8FC2FF] text-white rounded-[60px] font-semibold hover:bg-[#7AB1EE] transition"
              >
                예
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-[#153D6C] text-white rounded-[60px] font-medium hover:bg-[#0F2D4F] transition"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceRegistrationModal;
