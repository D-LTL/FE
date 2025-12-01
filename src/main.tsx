import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { setupAxiosInterceptor } from "./mock/axiosInterceptor.ts";

async function enableMocking() {
  // Service Worker 지원 확인
  if ('serviceWorker' in navigator) {
    try {
      const { worker } = await import("./mock/browser.ts");
      await worker.start({
        onUnhandledRequest: "warn",
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      });
      console.log('[MSW] Mocking enabled successfully');
      return;
    } catch (error) {
      console.error('[MSW] Failed to start:', error);
    }
  }

  // Service Worker 미지원 시 axios interceptor 사용
  console.log('[Mock] Service Worker not supported, using axios interceptor');
  setupAxiosInterceptor();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
