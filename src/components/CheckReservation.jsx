import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000"; // à adapter pour la prod

const CheckReservation = () => {
  const [reservationId, setReservationId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!reservationId) return;

    try {
      setLoading(true);
      setError("");
      setData(null);

      const url = `${API_BASE_URL}/api/reservations/${reservationId}`;
      console.log("URL appelée :", url);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      console.log("Status:", res.status);

      if (!res.ok) {
        const txt = await res.text();
        console.log("Réponse brute:", txt);
        throw new Error("Réservation introuvable");
      }

      const json = await res.json();
      console.log("JSON reçu :", json);
      setData(json);
    } catch (e) {
      console.error("Erreur fetch:", e);
      setError(e.message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="cart-thank section-bg padding-y-120 position-relative z-index-1 overflow-hidden">
      <img
        src="/assets/images/gradients/thanku.png"
        alt=""
        className="bg--gradient"
      />
      <div className="container container-two">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="cart-thank__content text-center">
              <h2 className="cart-thank__title mb-48">
                Merci de mettre Id de votre Réservation !
              </h2>
              

              <div className="row g-2 align-items-center">
  <div className="col-9 col-md-10">
    <input
      type="text"
      className="common-input radius-8 common-input--md w-100"
      id="id_reservation"
      placeholder="Ex: 12443"
      value={reservationId}
      onChange={(e) => setReservationId(e.target.value)}
    />
  </div>
  <div className="col-3 col-md-2 d-grid">
    <button
      type="button"
      className="btn btn-main"
      onClick={handleSearch}
      disabled={loading}
    >
      {loading ? "..." : "Vérifier"}
    </button>
  </div>
</div>

            </div>
          </div>
        </div>

        {data && (
          <div className="padding-t-120">
            <div className="cart-thank__box">
              <div className="row gy-4">
                {/* Détails réservation */}
                <div className="col-lg-6">
                  <div className="thank-card">
                    <h5 className="thank-card__title mb-3">
                      Détails de Réservation
                    </h5>
                    <ul className="list-text">
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500 font-heading fw-700 font-18">
                          No Réservation.
                        </span>
                        <span className="text">
                          #{data.id}
                        </span>
                      </li>

                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          Status de Réservation
                        </span>
                        <span className="text">
                          {data.statut}
                        </span>
                      </li>

                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          Date
                        </span>
                        <span className="text">
                          {data.date}
                        </span>
                      </li>

                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          Heure
                        </span>
                        <span className="text">
                          {data.heure}
                        </span>
                      </li>

                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          Client
                        </span>
                        <span className="text">
                          {data.client_prenom} {data.client_nom}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Infos prestataire */}
                <div className="col-lg-6">
                  <div className="thank-card">
                    <h5 className="thank-card__title mb-3">
                      Informations du Prestataire
                    </h5>
                    <ul className="list-text">
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          Nom du prestataire
                        </span>
                        <span className="text">
                          {data.prestataire?.nom} {data.prestataire?.prenom}
                        </span>
                      </li>

                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          Service
                        </span>
                        <span className="text">
                        {data.service?.categorie || "-"}
                        </span>
                      </li>

                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          Prix
                        </span>
                        <span className="text">
                          {data.prestataire?.prix_heure} MAD
                        </span>
                      </li>
                    </ul>

                    <div className="mt-3 flx-between gap-2">
                      <Link
                        to="/"
                        className="btn btn-main flx-align gap-2 pill"
                      >
                        Retour vers l'accueil
                        <span className="icon line-height-1 font-20">
                          <i className="las la-arrow-right" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckReservation;
