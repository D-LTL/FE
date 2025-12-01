import { useState, useEffect } from "react";
import LoginTemplate from "../components/login/components/LoginTemplate";

const LoginPage = () => {
  const [firstView, setFirstView] = useState("fade-in");
  const [showLogin, setShowLogin] = useState(false);
  const [mswStatus, setMswStatus] = useState("확인 중...");

  useEffect(() => {
    // MSW 상태 확인
    const checkMSW = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          if (registrations.length > 0) {
            setMswStatus("✓ Service Worker 등록됨");
          } else {
            setMswStatus("✗ Service Worker 미등록");
          }
        });
      } else {
        setMswStatus("✗ Service Worker 미지원");
      }
    };

    setTimeout(checkMSW, 1000);
  }, [showLogin]);

  const FirstViewPage = () => (
    <div
      className={`p-9 flex items-center justify-center h-screen bg-white ${firstView}`}
      onClick={() => {
        setFirstView("fade-out");
        setTimeout(() => setShowLogin(true), 750);
      }}
    >
      <p className="text-xs font-light leading-relaxed text-center">
        사용자의 실제 목소리를 학습하고 이를 바탕으로 감정이 반영된 번역 음성을
        생성함으로써, 기존의 딱딱한 기계음을 대체하고 개인화된 소통 경험을
        제공하는 서비스 입니다.
      </p>
    </div>
  );

  return (
    <>
      {!showLogin && <FirstViewPage />}
      {showLogin && (
        <>
          <LoginTemplate />
          <div className="fixed bottom-4 left-4 right-4 bg-gray-800 text-white text-xs p-3 rounded-lg opacity-90 z-50">
            <p className="font-bold mb-1">디버그 정보:</p>
            <p>MSW 상태: {mswStatus}</p>
            <p className="mt-1 text-gray-300">ID: ddorang / PW: 1234</p>
          </div>
        </>
      )}
    </>
  );
};

export default LoginPage;
