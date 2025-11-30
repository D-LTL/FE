import { http, HttpResponse } from "msw";

export const postVoice = http.post("/api/voices", async ({ request }) => {
  const body = (await request.json()) as { title: string };

  return HttpResponse.json({
    id: `voice-${Date.now()}`,
    title: body.title,
    createdAt: new Date().toISOString(),
  });
});
