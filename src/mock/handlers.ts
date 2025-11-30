import { postLogin } from "./handlers/UserHandler";
import { postVoice } from "./handlers/VoiceHandler";
import { postTranslate } from "./handlers/TranslationHandler";
import { getHistory } from "./handlers/HistoryHandler";

export const handlers = [postLogin, postVoice, postTranslate, getHistory];
