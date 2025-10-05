import axios from "axios";
import type { LoginResponse } from "../../../types/type";

export const requestLogin = async (): Promise<LoginResponse> => {
  const response = await axios.post('/api/auth/login');
  return response.data;
}