import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Statistics = () => {
  const [stats, setStats] = useState({
    total_services: 0,
    total_prestations: 0,
    total_reservations: 0,
    total_clients: 0,
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
    <section className="top-performance overflow-hidden padding-y-120 position-relative z-index-1">
      <div className="container container-two">
        <div className="row gy-4 align-items-center flex-wrap-reverse">

          <div className="col-lg-7 pe-lg-5">
            <div className="performance-content">

              <div className="performance-content__item">
                <span className="performance-content__text font-18">
                  Total de services
                </span>
                <h4 className="performance-content__count">
                  {formatNumber(stats.total_services)}+
                </h4>
              </div>

              <div className="performance-content__item">
                <span className="performance-content__text font-18">
                  Total Prestations
                </span>
                <h4 className="performance-content__count">
                  {formatNumber(stats.total_prestations)}+
                </h4>
              </div>

              <div className="performance-content__item">
                <span className="performance-content__text font-18">
                  Total réservations
                </span>
                <h4 className="performance-content__count">
                  {formatNumber(stats.total_reservations)}+
                </h4>
              </div>

              <div className="performance-content__item">
                <span className="performance-content__text font-18">
                  Total clients
                </span>
                <h4 className="performance-content__count">
                {formatNumber(stats.total_clients)}+
                </h4>
              </div>

            </div>
          </div>

          <div className="col-lg-5">
            <div className="section-content">
              <div className="section-heading style-left">
                <h3 className="section-heading__title">
                  Nos chiffres parlent d’eux-mêmes
                </h3>
                <p className="section-heading__desc font-18 w-sm">
                  Servini connecte chaque jour des centaines de clients à des prestataires
                  qualifiés à travers tout le Maroc.
                </p>
              </div>

              <Link to="/all-providers" className="btn btn-main btn-lg pill fw-300">
                Découvrir les prestataires
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Statistics;
