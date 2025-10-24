import { apiClient } from "@/lib/axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { EmailsResponse } from "@/types/email.types";
import { storage } from "@/lib/storage";

export const useGetEmails = (limit: number = 15) => {
  return useQuery({
    queryKey: ["emails", limit],
    queryFn: async () => {
      const response = await apiClient.get<{ data: EmailsResponse }>(
        `/emails?limit=${limit}`
      );
      return response.data.data;
    },
  });
};

export const useClassifyEmails = () => {
  return useMutation({
    mutationFn: async (emailIds: string[]) => {
      const geminiApiKey = storage.getGeminiApiKey();
      const response = await apiClient.post<{ data: EmailsResponse }>("/emails/classify", {
        emailIds,
        geminiApiKey,
      });
      console.log("useClassifyEmails", response)
      return response.data.data;
    },
  });
};
