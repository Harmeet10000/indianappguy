import { useAuth } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        <p className="text-muted-foreground">Welcome to your dashboard!</p>
      </div>
    </div>
  );
};
