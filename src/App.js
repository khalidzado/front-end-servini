import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import RouteScrollToTop from "./helper/RouteScrollToTop";

// --- Composant de Sécurité ---
import ProtectedRoute from "./components/ProtectedRoute";

// --- Pages Publiques ---
import HomePage from "./pages/HomePage";
import AllProviderPage from "./pages/AllProviderPage";
import ProfilePage from "./pages/ProfilePage";
import GetReservationPage from "./pages/GetReservationPage";
import CheckReservationPage from "./pages/CheckReservationPage";
import ThankYouPage from "./pages/ThankYouPage";
import ContactPage from "./pages/ContactPage";

// --- Pages d'Authentification ---
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

// --- Pages Admin ---
import DashboardAdminPage from "./pages/DashboardAdminPage";
import DashboardListePrestatairePage from "./pages/DashboardListePrestatairePage";

// --- Pages Prestataire ---
import DashboardPage from "./pages/DashboardPage";
import DashboardProfilePage from "./pages/DashboardProfilePage";
import DashboardReservationPage from "./pages/DashboardReservationPage";
import SettingPage from "./pages/SettingPage";
import ReviewPage from "./pages/ReviewPage";

function App() {
  return (
    <BrowserRouter>
      {/* Gestion du scroll lors des changements de page */}
      <RouteScrollToTop />
      <ScrollToTop smooth color="#0f7e62" />

      <Routes>
        
        {/* ================================================= */}
        {/* 1. ZONE PUBLIQUE (Accessible à tout le monde)     */}
        {/* ================================================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/all-providers" element={<AllProviderPage />} />
        <Route path="/profil/:id" element={<ProfilePage />} />
        <Route path="/reservation" element={<GetReservationPage />} />
        <Route path="/check-reservation" element={<CheckReservationPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Login / Register */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />


        {/* ================================================= */}
        {/* 2. ZONE ADMIN (Sécurisée - Rôle 'admin' requis)   */}
        {/* ================================================= */}
        {/* L'élément parent ProtectedRoute protège toutes les routes enfants */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/dashboard-admin" element={<DashboardAdminPage />} />        
            <Route path="/liste-prestataires" element={<DashboardListePrestatairePage />} />
            {/* Ajoutez d'autres routes Admin ici si nécessaire */}
        </Route>


        {/* ================================================= */}
        {/* 3. ZONE PRESTATAIRE (Sécurisée - Rôle 'prestataire') */}
        {/* ================================================= */}
        {/* L'élément parent ProtectedRoute protège toutes les routes enfants */}
        <Route element={<ProtectedRoute allowedRole="prestataire" />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard-profile" element={<DashboardProfilePage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/dashboard-reservation" element={<DashboardReservationPage />} />
            <Route path="/review" element={<ReviewPage />} />
        </Route>


        {/* ================================================= */}
        {/* 4. PAGE 404 (Route par défaut)                    */}
        {/* ================================================= */}
        {/* Si l'utilisateur tape une URL qui n'existe pas, on le renvoie à l'accueil ou login */}
        <Route path="*" element={<HomePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;