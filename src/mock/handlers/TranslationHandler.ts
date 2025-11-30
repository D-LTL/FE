import { http, HttpResponse } from "msw";
import type { TranslationRequest } from "../../types/type";

// Preset translations
const translations: { [key: string]: string } = {
  안녕하세요: "Hello",
  감사합니다: "Thank you",
  "좋은 아침입니다": "Good morning",
  "만나서 반갑습니다": "Nice to meet you",
  "오늘 날씨가 좋네요": "The weather is nice today",
  "이 근처에 식당이 있나요": "Is there a restaurant nearby",
  "공항까지 얼마나 걸리나요": "How long does it take to the airport",
  "저는 한국어를 배우고 있어요": "I am learning Korean",
};

export const postTranslate = http.post(
  "/api/translate",
  async ({ request }) => {
    const body = (await request.json()) as TranslationRequest;

    const translatedText =
      translations[body.sourceText] || `Translated: ${body.sourceText}`;

    return HttpResponse.json({
      id: `trans-${Date.now()}`,
      sourceText: body.sourceText,
      translatedText,
      sourceAudioUrl: `/audio/source-${Date.now()}.wav`,
      translatedAudioUrl: `/audio/translated-${Date.now()}.wav`,
      createdAt: new Date().toISOString(),
    });
  }
);
