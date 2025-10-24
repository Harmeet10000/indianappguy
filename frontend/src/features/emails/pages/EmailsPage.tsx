import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmailCard } from "../components/EmailCard";
import { useGetEmails, useClassifyEmails } from "../api/emails.api";
import { useAuth } from "@/features/auth";
import { storage } from "@/lib/storage";
import { parseEmailFrom } from "../utils/email.utils";
import { getCategoryColor } from "../utils/categoryColors";

export const EmailsPage = () => {
  const [limit, setLimit] = useState("15");
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const { data, isLoading, error } = useGetEmails(parseInt(limit));
  const classifyMutation = useClassifyEmails();
  const [emails, setEmails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleClassify = () => {
    const geminiApiKey = storage.getGeminiApiKey();

    if (!geminiApiKey) {
      alert("Please set your Gemini API key first");
      navigate("/login");
      return;
    }

    if (data?.emails) {
      const emailIds = data.emails.map((email) => email.id);
      classifyMutation.mutate(emailIds, {
        onSuccess: (classifiedData) => {
          setEmails(classifiedData.emails);
        },
        onError: (error) => {
          console.error("Classification error:", error);
          alert("Failed to classify emails");
        },
      });
    }
  };

  const displayEmails = emails || data?.emails;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-semibold">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              <div className="text-sm">
                <p className="font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={limit} onValueChange={setLimit}>
                <SelectTrigger className="w-[180px]  bg-background">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 emails</SelectItem>
                  <SelectItem value="10">10 emails</SelectItem>
                  <SelectItem value="15">15 emails</SelectItem>
                  <SelectItem value="25">25 emails</SelectItem>
                  <SelectItem value="50">50 emails</SelectItem>
                  <SelectItem value="100">100 emails</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleClassify}
              disabled={classifyMutation.isPending || isLoading}
            >
              {classifyMutation.isPending ? "Classifying..." : "Classify"}
            </Button>
          </div>
        </div>
      </div>

      {/* Email List */}
      <main className="container mx-auto px-4 py-6">
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading emails...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load emails</p>
          </div>
        )}

        {displayEmails && displayEmails.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No emails found</p>
          </div>
        )}

        {displayEmails && displayEmails.length > 0 && (
          <div className="flex gap-4 h-[calc(100vh-240px)]">
            <div className="w-2/5 space-y-3 overflow-y-auto">
              {displayEmails.map((email) => (
                <EmailCard
                  key={email.id}
                  email={email}
                  isSelected={selectedEmail === email.id}
                  onClick={() => setSelectedEmail(email.id)}
                />
              ))}
            </div>
            {selectedEmail && (
              <div className="flex-1 border rounded-lg p-6 bg-card overflow-y-auto">
                {(() => {
                  const email = displayEmails.find((e) => e.id === selectedEmail);
                  if (!email) return null;
                  const sender = parseEmailFrom(email.from);
                  return (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl font-semibold">
                          {email.subject}
                        </h2>
                        {email.category && (
                          <span className={`text-sm font-bold capitalize ${getCategoryColor(email.category)}`}>
                            {email.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary">
                            {sender.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{sender.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {sender.email}
                          </p>
                        </div>
                      </div>
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{email.snippet}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
