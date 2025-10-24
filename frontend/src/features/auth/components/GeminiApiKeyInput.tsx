import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/storage";
import { Eye, EyeOff } from "lucide-react";

interface GeminiApiKeyInputProps {
  onSave?: () => void;
}

export const GeminiApiKeyInput = ({ onSave }: GeminiApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState(storage.getGeminiApiKey() || "");
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (apiKey.trim()) {
      storage.setGeminiApiKey(apiKey.trim());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      onSave?.();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="gemini-api-key">Gemini API Key</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            id="gemini-api-key"
            type={showKey ? "text" : "password"}
            placeholder="Enter your Gemini API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showKey ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <Button onClick={handleSave} type="button">
          {isSaved ? "Saved!" : "Save"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Your API key is stored locally in your browser
      </p>
    </div>
  );
};
