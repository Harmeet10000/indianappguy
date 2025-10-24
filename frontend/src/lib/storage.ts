export const storage = {
  getGeminiApiKey: (): string | null => {
    return localStorage.getItem("gemini_api_key");
  },

  setGeminiApiKey: (key: string): void => {
    localStorage.setItem("gemini_api_key", key);
  },

  removeGeminiApiKey: (): void => {
    localStorage.removeItem("gemini_api_key");
  },

  getAuthToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },

  setAuthToken: (token: string): void => {
    localStorage.setItem("auth_token", token);
  },

  removeAuthToken: (): void => {
    localStorage.removeItem("auth_token");
  },
};
