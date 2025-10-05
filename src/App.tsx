import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
