import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import MyPage from "./page/MyPage";
import VoiceRegisterPage from "./page/VoiceRegisterPage";
import TranslatePage from "./page/TranslatePage";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voice-register"
          element={
            <ProtectedRoute>
              <VoiceRegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/translate"
          element={
            <ProtectedRoute>
              <TranslatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
