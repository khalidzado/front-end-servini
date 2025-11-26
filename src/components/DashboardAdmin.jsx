
import { useEffect, useState, useRef } from "react";

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    total_services: 0,
    total_prestations: 0,
    total_reservations: 0,
    total_clients: 0,
    total_prestataires: 0,
  });

  const [loading, setLoading] = useState(true);


  // 🔥 Charger les statistiques avec fetch
  useEffect(() => {
    fetch("http://localhost:8000/api/stats")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur stats:", error);
        setLoading(false);
      });
  }, []);

  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      text.innerHTML = text.innerText
        .split("")
        .map(
          (char, i) => `<span style="transform:rotate(${i * 11.5}deg)">${char}</span>`
        )
        .join("");
    }
  }, []);

  const formatNumber = (n) => n.toLocaleString();

  if (loading) return <p>Chargement...</p>;

    return (
        <div className="dashboard-body__content">
            {/* welcome balance Content Start */}
            <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
                <div className="welcome-balance__left">
                    <h4 className="welcome-balance__title mb-0">Bonjour et bienvenue admin</h4>
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
                                        src="/assets/images/icons/client.svg"
                                        alt=""
                                    />
                                </span>
                                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                                    <div>
                                        <h4 className="dashboard-widget__number mb-1 mt-3">{formatNumber(stats.total_prestataires)}+</h4>
                                        <span className="dashboard-widget__text font-14">
                                            Total Prestataires
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

export default DashboardAdmin;