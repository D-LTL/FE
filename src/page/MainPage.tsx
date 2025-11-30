import { useEffect, useState } from "react";
import History from "../components/main/components/History";
import MainTitle from "../components/main/components/MainTitle";
import ProfileSection from "../components/main/components/ProfileSection";
import TranslationButton from "../components/main/components/TranslationButton";
import VoiceRegistrationModal from "../components/common/VoiceRegistrationModal";
import { useVoiceStore } from "../store/voiceStore";

const MainPage = () => {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const voices = useVoiceStore((state) => state.voices);

  useEffect(() => {
    if (voices.length === 0) {
      setShowVoiceModal(true);
    }
  }, [voices.length]);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center">
      <ProfileSection />
      <MainTitle />
      <History className="flex-1" />
      <div className="absolute bottom-0 w-full h-[204px] bg-gradient-to-t from-white to-transparent" />
      <TranslationButton />
      {showVoiceModal && (
        <VoiceRegistrationModal onClose={() => setShowVoiceModal(false)} />
      )}
    </div>
  );
};

export default MainPage;
