import type { LoginPayload, LoginResponse } from "../../../types/type";
import axios from "axios";

export const requestLogin = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  const response = await axios.post("/api/auth/login", credentials);
  return response.data;
};