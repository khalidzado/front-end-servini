import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardReview = () => {
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Récupérer le token
  const token = localStorage.getItem("auth_token");

  const prestataireJson = localStorage.getItem("user_info") || localStorage.getItem("prestataire");
  let prestataireId = null;
  
  if (prestataireJson) {
    try {
      const userObj = JSON.parse(prestataireJson);
      prestataireId = userObj.id;
    } catch (e) {
      console.error("Erreur parsing user info", e);
    }
  }

  const fetchAvis = async () => {
    if (!prestataireId || !token) {
        setLoading(false);
        return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/prestataires/${prestataireId}/avis`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }
      );

      if (response.status === 401) {
          navigate("/login");
          return;
      }

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des avis");
      }

      const data = await response.json();
      setAvis(data.avis || data || []); 
    } catch (error) {
      console.error("Erreur fetch avis:", error);
      setAvis([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvis();
  }, [prestataireId, token]);

  const renderStars = (note) => {
    return [...Array(5)].map((_, index) => (
      <li key={index} className="star-rating__item font-16">
        <i className={`fas fa-star ${index < note ? 'text-warning' : 'text-muted'}`} />
      </li>
    ));
  };

  return (
    <div className="dashboard-body__content">
      <div className="card common-card border border-gray-five">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-main" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table text-body mt--24">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Commentaire</th>
                      {/* AJOUT DE LA CLASSE text-center ICI POUR ALIGNER LE TITRE */}
                      <th className="text-center">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {avis.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center py-5">
                          <p className="text-muted">Aucun avis pour le moment</p>
                        </td>
                      </tr>
                    ) : (
                      avis.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="review-product d-flex align-items-center gap-2">
                              <div className="review-product__content">
                                <h6 className="review-product__name font-15 fw-500 mb-0">
                                  {item.client_prenom} {item.client_nom}
                                </h6>
                                <span className="review-product__date font-12 text-muted">
                                  {item.date}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="product-user font-12">
                              <span>{item.commentaire}</span>
                            </div>
                          </td>
                          {/* AJOUT DE LA CLASSE text-center ICI POUR ALIGNER LES ÉTOILES */}
                          <td className="text-center" style={{ verticalAlign: 'middle' }}>
                            <ul className="star-rating justify-content-center list-unstyled d-flex gap-1 mb-0">
                              {renderStars(item.note)}
                            </ul>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardReview;