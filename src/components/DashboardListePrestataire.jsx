import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardListePrestataire = () => {
  const [prestataires, setPrestataires] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Récupérer le token stocké lors du login
  const token = localStorage.getItem("auth_token");

  // =========================
  // Récupération de la liste
  // =========================
  const getPrestataires = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/prestataires",
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      // --- GESTION DE L'EXPIRATION DE SESSION ---
      if (response.status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_info");
        navigate("/login");
        return;
      }
      // ------------------------------------------

      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
      }

      const data = await response.json();
      setPrestataires(data || []);
    } catch (err) {
      console.error("Erreur fetch prestataires :", err);
      setPrestataires([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrestataires();
  }, []);

  // =========================
  // Couleur du statut
  // =========================
  const getStatusClass = (status) => {
    switch (status) {
      case "active":
      case "approved": // Au cas où tu utilises 'approved' dans la BDD
        return "text-success";
      case "rejected":
        return "text-danger";
      case "pending":
      default:
        return "text-warning";
    }
  };

  // =========================
  // Supprimer / annuler
  // =========================
  const handleAnnuler = async (id) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer le prestataire ID: ${id} ?`)) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/prestataires/${id}`,
        {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
          navigate("/login");
          return;
      }

      if (response.ok) {
        alert("Prestataire supprimé !");
        getPrestataires(); // Rafraîchir la liste
      } else {
        alert(`Erreur lors de la suppression. Code: ${response.status}`);
      }
    } catch (err) {
      console.error("Erreur annulation :", err);
      alert("Erreur réseau lors de la suppression.");
    }
  };

  // =========================
  // Changement générique de statut
  // =========================
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/prestataires/statut/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.status === 401) {
          navigate("/login");
          return;
      }

      if (response.ok) {
        alert(`Statut changé en ${newStatus}`);
        getPrestataires(); // Rafraîchir la liste
      } else {
        alert(`Erreur lors du changement de statut. Code: ${response.status}`);
      }
    } catch (err) {
      console.error("Erreur changement statut :", err);
      alert("Erreur réseau ou serveur lors du changement de statut.");
    }
  };

  const handleAccepter = (id) => {
    // Note: Vérifie si ton backend attend "active" ou "approved"
    if (!window.confirm(`Voulez-vous vraiment ACTIVER le profil ID: ${id} ?`)) return;
    updateStatus(id, "active"); 
  };

  const handleRejeter = (id) => {
    if (!window.confirm(`Voulez-vous vraiment REJETER le profil ID: ${id} ?`)) return;
    updateStatus(id, "rejected");
  };

  // =========================
  // Télécharger / Voir ID (CORRIGÉ)
  // =========================
  const handleTelechargerID = (imagePath) => {
    if (!imagePath) {
      alert("Aucune pièce d'identité disponible");
      return;
    }
    
    // CORRECTION ICI :
    // On pointe directement vers la racine (public) car imagePath contient déjà "id_cards/xxx.png"
    // et on a supprimé "storage/" de l'URL.
    const fullPath = imagePath.startsWith('http') 
        ? imagePath 
        : `http://localhost:8000/${imagePath}`;
        
    window.open(fullPath, "_blank");
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="dashboard-body__content">
      <div className="row gy-4">
        <div className="col-12">
          <div className="card common-card border border-gray-five">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table text-body mt--24">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>Ville</th>
                      <th>Statut</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prestataires.length === 0 && (
                      <tr>
                        <td colSpan="8" className="text-center">
                          Aucun prestataire trouvé.
                        </td>
                      </tr>
                    )}

                    {prestataires.map((prestataire) => (
                      <tr key={prestataire.id}>
                        <td data-label="ID">{prestataire.id}</td>
                        <td data-label="Nom">{prestataire.nom}</td>
                        <td data-label="Prénom">{prestataire.prenom}</td>
                        <td data-label="Téléphone">{prestataire.telephone}</td>
                        <td data-label="Email">{prestataire.email}</td>
                        <td data-label="Ville">{prestataire.ville}</td>
                        <td data-label="Statut">
                          <span className={getStatusClass(prestataire.status)}>
                            {prestataire.status || "pending"}
                          </span>
                        </td>

                        <td data-label="Action" className="d-flex flex-wrap gap-2">
                          {/* Supprimer */}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleAnnuler(prestataire.id)}
                            title="Supprimer"
                          >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" fill="transparent" />
                              <path d="M5 7.5H19L18 21H6L5 7.5Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M15.5 9.5L15 19" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12 9.5V19" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M8.5 9.5L9 19" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M16 5H19C20.1046 5 21 5.89543 21 7V7.5H3V7C3 5.89543 3.89543 5 5 5H8M16 5L15 3H9L8 5M16 5H8" stroke="#ffffff" strokeLinejoin="round" />
                            </svg>
                          </button>

                          {/* Activer */}
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={() => handleAccepter(prestataire.id)}
                            disabled={prestataire.status === "active"}
                            title="Activer"
                          >
                            <svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                              <path d="m16 0c8.836556 0 16 7.163444 16 16s-7.163444 16-16 16-16-7.163444-16-16 7.163444-16 16-16zm0 2c-7.7319865 0-14 6.2680135-14 14s6.2680135 14 14 14 14-6.2680135 14-14-6.2680135-14-14-14zm6.6208153 9.8786797c.3905243.3905242.3905243 1.0236892 0 1.4142135l-7.0710678 7.0710678c-.3626297.3626297-.9344751.3885319-1.3269928.0777064l-.0872208-.0777064-4.24264068-4.2426407c-.39052429-.3905242-.39052429-1.0236892 0-1.4142135.39052428-.3905243 1.02368928-.3905243 1.41421358 0l3.5348268 3.5348268 6.3646681-6.3632539c.3905243-.3905243 1.0236893-.3905243 1.4142136 0z" />
                            </svg>
                          </button>

                          {/* Rejeter */}
                          <button
                            type="button"
                            className="btn btn-warning btn-sm d-flex align-items-center justify-content-center gap-1"
                            onClick={() => handleRejeter(prestataire.id)}
                            disabled={prestataire.status === "rejected"}
                            title="Rejeter"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
                              <path d="M5 5L11 11M11 5L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </button>

                          {/* Télécharger ID */}
                          <button
                            type="button"
                            className="btn btn-info btn-sm"
                            onClick={() => handleTelechargerID(prestataire.carte_identite)}
                            title="Voir/Télécharger Pièce d'identité"
                          >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 4V20M12 20L15 17M12 20L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M5 15C5 17.7614 7.23858 20 10 20H14C16.7614 20 19 17.7614 19 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardListePrestataire;