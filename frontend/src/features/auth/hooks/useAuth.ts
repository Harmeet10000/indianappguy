import { useSession, signOut } from "@/lib/auth";
import { storage } from "@/lib/storage";

export const useAuth = () => {
  const { data: session, isPending } = useSession();
  const isAuthenticated = !!session?.user;

  const logout = async () => {
    await signOut();
    storage.removeGeminiApiKey();
  };

  return { isAuthenticated, isLoading: isPending, logout, user: session?.user };
};
