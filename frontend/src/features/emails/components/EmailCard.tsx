import { Card, CardContent } from "@/components/ui/card";
import type { Email } from "@/types/email.types";
import { parseEmailFrom } from "../utils/email.utils";
import { getCategoryColor } from "../utils/categoryColors";

interface EmailCardProps {
  email: Email;
  isSelected?: boolean;
  onClick?: () => void;
}

export const EmailCard = ({ email, isSelected, onClick }: EmailCardProps) => {
  const sender = parseEmailFrom(email.from);
  
  return (
    <Card
      className={`hover:shadow-md transition-shadow cursor-pointer ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {sender.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-sm truncate">
                {email.subject}
              </h3>
              {email.category && (
                <span className={`text-xs font-bold ml-2 flex-shrink-0 capitalize ${getCategoryColor(email.category)}`}>
                  {email.category}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-2">{sender.name}</p>
            <p className="text-sm text-foreground line-clamp-2">{email.snippet}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
