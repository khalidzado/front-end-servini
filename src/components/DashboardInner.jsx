import { useEffect, useState, useRef } from "react";

const DashboardInner = () => {

    const [stats, setStats] = useState({
        total_prestations: 0,
        total_reservations: 0,
        total_clients: 0,
        total_commentaires: 0,
      });
    
      const [prestataire, setPrestataire] = useState({
        name: "Prestataire",
      });
    
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const textRef = useRef(null);
    
      // Récupérer le token d'authentification
      const getAuthToken = () => {
        // Adapter selon votre méthode de stockage (localStorage, sessionStorage, cookie)
        return localStorage.getItem("auth_token");
      };
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const token = getAuthToken();
    
            // Récupérer les statistiques
            const statsResponse = await fetch(
              "http://localhost:8000/api/stats/prestataire",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
                credentials: "include",
              }
            );
    
            if (!statsResponse.ok) {
              throw new Error("Erreur lors de la récupération des statistiques");
            }
    
            const statsData = await statsResponse.json();
            setStats(statsData);
    
            // Récupérer les informations du prestataire
            const prestataireResponse = await fetch(
              "http://localhost:8000/api/user",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
                credentials: "include",
              }
            );
    
            if (prestataireResponse.ok) {
              const prestataireData = await prestataireResponse.json();
              setPrestataire(prestataireData);
            }
    
            setLoading(false);
          } catch (error) {
            console.error("Erreur:", error);
            setError(error.message);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      useEffect(() => {
        const text = textRef.current;
        if (text) {
          text.innerHTML = text.innerText
            .split("")
            .map(
              (char, i) =>
                `<span style="transform:rotate(${i * 11.5}deg)">${char}</span>`
            )
            .join("");
        }
      }, []);
    
      const formatNumber = (n) => {
        return n ? n.toLocaleString() : 0;
      };
    
      if (loading) {
        return (
          <div className="dashboard-body__content">
            <div className="text-center p-5">
              <p>Chargement des statistiques...</p>
            </div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="dashboard-body__content">
            <div className="alert alert-danger m-4">
              <p>Erreur: {error}</p>
            </div>
          </div>
        );
      }

    return (
        <div className="dashboard-body__content">
            {/* welcome balance Content Start */}
            <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
                <div className="welcome-balance__left">
                    <h4 className="welcome-balance__title mb-0">Bonjour et bienvenue  {prestataire.name || prestataire.nom}!</h4>
                </div>
                
            </div>
            {/* welcome balance Content End */}
            <div className="dashboard-body__item-wrapper">
                {/* dashboard body Item Start */}
                <div className="dashboard-body__item">
                    <div className="row gy-4">
                        <div className="col-xl-3 col-sm-6">
                            <div className="dashboard-widget">
                                <img
                                    src="/assets/images/shapes/widget-shape1.png"
                                    alt=""
                                    className="dashboard-widget__shape one"
                                />
                                <img
                                    src="/assets/images/shapes/widget-shape2.png"
                                    alt=""
                                    className="dashboard-widget__shape two"
                                />
                                <span className="dashboard-widget__icon">
                                    <img
                                        src="/assets/images/icons/client.svg"
                                        alt=""
                                    />
                                </span>
                                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                                    <div>
                                        <h4 className="dashboard-widget__number mb-1 mt-3"> {formatNumber(stats.total_clients)}+</h4>
                                        <span className="dashboard-widget__text font-14">
                                            Total Clients
                                        </span>
                                    </div>
                                    <img src="/assets/images/icons/chart-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="dashboard-widget">
                                <img
                                    src="/assets/images/shapes/widget-shape1.png"
                                    alt=""
                                    className="dashboard-widget__shape one"
                                />
                                <img
                                    src="/assets/images/shapes/widget-shape2.png"
                                    alt=""
                                    className="dashboard-widget__shape two"
                                />
                                <span className="dashboard-widget__icon">
                                    <img
                                        src="/assets/images/icons/prestation.svg"
                                        alt=""
                                    />
                                </span>
                                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                                    <div>
                                        <h4 className="dashboard-widget__number mb-1 mt-3">
                                        {formatNumber(stats.total_prestations)}+
                                        </h4>
                                        <span className="dashboard-widget__text font-14">
                                            Total Prestations
                                        </span>
                                    </div>
                                    <img src="/assets/images/icons/chart-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="dashboard-widget">
                                <img
                                    src="/assets/images/shapes/widget-shape1.png"
                                    alt=""
                                    className="dashboard-widget__shape one"
                                />
                                <img
                                    src="/assets/images/shapes/widget-shape2.png"
                                    alt=""
                                    className="dashboard-widget__shape two"
                                />
                                <span className="dashboard-widget__icon">
                                    <img
                                        src="/assets/images/icons/reservation.svg"
                                        alt=""
                                    />
                                </span>
                                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                                    <div>
                                        <h4 className="dashboard-widget__number mb-1 mt-3">{formatNumber(stats.total_reservations)}+</h4>
                                        <span className="dashboard-widget__text font-14">
                                            Total Réservations
                                        </span>
                                    </div>
                                    <img src="/assets/images/icons/chart-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="dashboard-widget">
                                <img
                                    src="/assets/images/shapes/widget-shape1.png"
                                    alt=""
                                    className="dashboard-widget__shape one"
                                />
                                <img
                                    src="/assets/images/shapes/widget-shape2.png"
                                    alt=""
                                    className="dashboard-widget__shape two"
                                />
                                <span className="dashboard-widget__icon">
                                    <img
                                        src="/assets/images/icons/review.svg"
                                        alt=""
                                    />
                                </span>
                                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                                    <div>
                                        <h4 className="dashboard-widget__number mb-1 mt-3">{formatNumber(stats.total_commentaires)}+</h4>
                                        <span className="dashboard-widget__text font-14">
                                            Total évaluations
                                        </span>
                                    </div>
                                    <img src="/assets/images/icons/chart-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    );
}

export default DashboardInner;