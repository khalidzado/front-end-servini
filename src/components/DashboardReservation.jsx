import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("auth_token");


  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      const dateLocale = d.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return `${dateLocale} ${timeStr || ""}`;
    } catch {
      return `${dateStr} ${timeStr || ""}`;
    }
  };

  useEffect(() => {
    const prestataireJson = localStorage.getItem("user_info") || localStorage.getItem("prestataire");
    
    if (!token || !prestataireJson) {
      setLoading(false);
      return;
    }

    const prestataire = JSON.parse(prestataireJson);
    const prestataireId = prestataire.id;

    const getReservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/prestataires/${prestataireId}/reservations`,
          {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`, // <--- CRUCIAL : AJOUT DU TOKEN
            },
          }
        );

        if (response.status === 401) {
             navigate("/login");
             return;
        }

        if (!response.ok) {
          throw new Error("Erreur HTTP " + response.status);
        }

        const data = await response.json();
        setReservations(data);
      } catch (err) {
        console.error("Erreur fetch reservations :", err);
      } finally {
        setLoading(false);
      }
    };

    getReservations();
  }, [token, navigate]);

  const handleUpdateStatus = async (reservationId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/reservations/${reservationId}/statut`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`, // <--- CRUCIAL : AJOUT DU TOKEN
          },
          body: JSON.stringify({ statut: newStatus }),
        }
      );

      if (response.status === 401) {
          navigate("/login");
          return;
      }

      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
      }

      const updated = await response.json();

  
      const nouveauStatut = updated.data ? updated.data.statut : newStatus;

      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, statut: nouveauStatut } : r
        )
      );
    } catch (error) {
      console.error("Erreur mise à jour statut :", error);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const handleCancel = (reservationId) => {
    if(window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
        handleUpdateStatus(reservationId, "annulee");
    }
  };

  const handleConfirm = (reservationId) => {
    handleUpdateStatus(reservationId, "confirmee");
  };

  const getStatusBadgeClass = (statut) => {
    switch (statut) {
      case "annulee":
        return "badge bg-danger";
      case "confirmee":
        return "badge bg-success";
      case "en_attente":
      default:
        return "badge bg-warning text-dark";
    }
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
                      <th>Date et heure</th>
                      <th>ID Réservation</th>
                      <th>Nom Client</th>
                      <th>Prénom Client</th>
                      <th>Téléphone</th>
                      <th>Adresse</th>
                      <th>Besoin</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center">
                          Aucune réservation trouvée.
                        </td>
                      </tr>
                    )}
                    
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td data-label="Date et Heure">
                          {formatDateTime(reservation.date, reservation.heure)}
                        </td>
                        <td data-label="ID Reservation">{reservation.id}</td>
                        <td data-label="nom">{reservation.client_nom}</td>
                        <td data-label="prenom">{reservation.client_prenom}</td>
                        <td data-label="phone">
                          {reservation.client_telephone}
                        </td>
                        <td data-label="adresse">
                          {reservation.client_adresse}
                        </td>
                        <td data-label="description">
                          {reservation.description_du_besoin}
                        </td>
                        <td data-label="status">
                          <span className={getStatusBadgeClass(reservation.statut)}>
                            {reservation.statut}
                          </span>
                        </td>
                        <td data-label="action">
                          <div className="d-flex gap-2">
                            {/* Bouton Annuler */}
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => handleCancel(reservation.id)}
                              title="Annuler"
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

                            {/* Bouton Confirmer */}
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                              onClick={() => handleConfirm(reservation.id)}
                              title="Confirmer"
                            >
                              <svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="m16 0c8.836556 0 16 7.163444 16 16s-7.163444 16-16 16-16-7.163444-16-16 7.163444-16 16-16zm0 2c-7.7319865 0-14 6.2680135-14 14s6.2680135 14 14 14 14-6.2680135 14-14-6.2680135-14-14-14zm6.6208153 9.8786797c.3905243.3905242.3905243 1.0236892 0 1.4142135l-7.0710678 7.0710678c-.3626297.3626297-.9344751.3885319-1.3269928.0777064l-.0872208-.0777064-4.24264068-4.2426407c-.39052429-.3905242-.39052429-1.0236892 0-1.4142135.39052428-.3905243 1.02368928-.3905243 1.41421358 0l3.5348268 3.5348268 6.3646681-6.3632539c.3905243-.3905243 1.0236893-.3905243 1.4142136 0z" />
                              </svg>
                            </button>
                          </div>
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

export default DashboardReservationPage;