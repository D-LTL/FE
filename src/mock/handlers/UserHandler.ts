import { http, HttpResponse } from "msw";
import type { LoginPayload } from "../../types/type";

export const postLogin = http.post("/api/auth/login", async ({ request }) => {
  console.log('[MSW] Login request intercepted');
  const body = (await request.json()) as LoginPayload;
  console.log('[MSW] Credentials:', { id: body.id });

  // Validate credentials: id="ddorang", pw="1234"
  if (body.id === "ddorang" && body.password === "1234") {
    console.log('[MSW] Login successful');
    return HttpResponse.json({
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZG9yYW5nIn0",
      token_type: "Bearer",
    });
  }

  // Invalid credentials
  console.log('[MSW] Login failed');
  return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
});
