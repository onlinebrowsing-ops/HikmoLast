import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Waxaan ka baaraynaa LocalStorage haddii uu jiro isticmaale login ah
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  if (!isAuthenticated) {
    // Haddii uusan login ahayn, u ridi bogga login-ka
    return <Navigate to="/login" replace />;
  }

  return children;
}