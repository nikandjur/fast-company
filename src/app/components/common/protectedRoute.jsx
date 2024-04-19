import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom"; // Импорт хука useLocation
import { Users } from "../layouts/users";

export const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const location = useLocation(); // Получение текущего пути

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Users />;
};
