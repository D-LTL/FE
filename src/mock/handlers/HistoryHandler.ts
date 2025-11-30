import { http, HttpResponse } from "msw";

export const getHistory = http.get("/api/history", async () => {
  // In a real scenario, this would fetch from a database
  // For now, we'll return a simple response since the frontend loads from JSON file
  return HttpResponse.json({
    items: [],
  });
});
