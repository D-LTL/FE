import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

async function enableMocking() {
  try {
    const { worker } = await import("./mock/browser.ts");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    });
    console.log('[MSW] Mocking enabled');
  } catch (error) {
    console.error('[MSW] Failed to start:', error);
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
