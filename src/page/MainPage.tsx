import MainTitle from "../components/main/components/MainTitle";
import ProfileSection from "../components/main/components/ProfileSection";

const MainPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <ProfileSection />
      <MainTitle />
    </div>
  );
}

export default MainPage;