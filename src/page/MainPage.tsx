import { useEffect, useState } from "react";
import History from "../components/main/components/History";
import MainTitle from "../components/main/components/MainTitle";
import ProfileSection from "../components/main/components/ProfileSection";
import TranslationButton from "../components/main/components/TranslationButton";
import VoiceRegistrationModal from "../components/common/VoiceRegistrationModal";
import TranslationModal from "../components/translate/TranslationModal";
import { useVoiceStore } from "../store/voiceStore";
import type { HistoryItem } from "../types/type";

const MainPage = () => {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null);
  const voices = useVoiceStore((state) => state.voices);

  useEffect(() => {
    if (voices.length === 0) {
      setShowVoiceModal(true);
    }
  }, [voices.length]);

  const handleOpenTranslation = (historyData?: HistoryItem) => {
    setSelectedHistory(historyData || null);
    setShowTranslationModal(true);
  };

  const handleCloseTranslation = () => {
    setShowTranslationModal(false);
    setSelectedHistory(null);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center">
      <ProfileSection />
      <MainTitle />
      <History className="flex-1" onOpenTranslation={handleOpenTranslation} />
      <div className="absolute bottom-0 w-full h-[204px] bg-gradient-to-t from-white to-transparent" />
      <TranslationButton onOpen={() => handleOpenTranslation()} />
      {showVoiceModal && (
        <VoiceRegistrationModal onClose={() => setShowVoiceModal(false)} />
      )}
      {showTranslationModal && (
        <TranslationModal
          onClose={handleCloseTranslation}
          historyData={selectedHistory}
        />
      )}
    </div>
  );
};

export default MainPage;
