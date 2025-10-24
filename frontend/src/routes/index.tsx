import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth";
import { EmailsPage } from "@/features/emails";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/emails",
    element: (
      // <ProtectedRoute>
        <EmailsPage />
      // </ProtectedRoute>
    ),
  },
]);
