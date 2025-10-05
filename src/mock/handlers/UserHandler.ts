import { http, HttpResponse } from "msw";

export const postLogin = http.post("/api/auth/login", () => {
  return HttpResponse.json({
    access_token: "eyJhbGciOiJIUzI1",
    token_type: "Bearer",
  });
});
