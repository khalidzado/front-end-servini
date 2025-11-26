import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole, children }) => {
  const token = localStorage.getItem("auth_token");
  const userRole = localStorage.getItem("user_role"); // "admin" ou "prestataire"

  // 1. verification est que  est connecte ?
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. hna kanvirifiw l role ( Admin vs Prestataire)
  // Si la route demande un rele precis (ex: 'admin') ET que l'utilisateur  pas ce role
  if (allowedRole && userRole !== allowedRole) {
    // Redirection intelligente : on le renvoie vers SON tableau de bord approprie
    // bach prestataire maydkhlch l profile admin o l3akso sa7i7
    if (userRole === 'admin') {
      return <Navigate to="/dashboard-admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // 3. Affichage de la page demande
  // Si "children" existe , on l'utilise.
  // Sinon, on utilise <Outlet /> 
  return children ? children : <Outlet />;
};

export default ProtectedRoute;