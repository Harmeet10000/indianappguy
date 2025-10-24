import { apiClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { storage } from "@/lib/storage";

interface GoogleAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: async (code: string) => {
      const response = await apiClient.post<GoogleAuthResponse>(
        "/auth/google",
        { code }
      );
      return response.data;
    },
    onSuccess: (data) => {
      storage.setAuthToken(data.token);
    },
  });
};
