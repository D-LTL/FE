import History from "../components/main/components/History";
import MainTitle from "../components/main/components/MainTitle";
import ProfileSection from "../components/main/components/ProfileSection";
import TranslationButton from "../components/main/components/TranslationButton";

const MainPage = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center">
      <ProfileSection />
      <MainTitle />
      <History className="flex-1" />
      <div className="absolute bottom-0 w-full h-[238px] bg-gradient-to-t from-white to-transparent" />
      <TranslationButton />
    </div>
  );
};

export default MainPage;
