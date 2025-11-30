export interface LoginPayload {
  id: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

// Voice
export interface Voice {
  id: string;
  title: string;
  createdAt: string;
}

export interface VoiceResponse {
  id: string;
  title: string;
  createdAt: string;
}

// Translation
export interface TranslationRequest {
  sourceText: string;
  voiceId?: string;
}

export interface TranslationResponse {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceAudioUrl: string;
  translatedAudioUrl: string;
  createdAt: string;
}

// History
export interface HistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceAudioUrl: string;
  translatedAudioUrl: string;
  createdAt: string;
  title: string;
}

export interface HistoryResponse {
  items: HistoryItem[];
}

// Auth
export interface User {
  id: string;
  username: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
}
