import type { LoginResponse } from "../../../types/type";
import axios from "axios";

export const requestLogin = async (): Promise<LoginResponse> => {
  const response = await axios.post('/api/auth/login');
  return response.data;
}