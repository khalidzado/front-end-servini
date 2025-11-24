import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CartThankYou = () => {
  const location = useLocation();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (location.state && location.state.reservation) {
      const res = location.state.reservation;
      
      console.log('📦 Réservation complète:', res);
      console.log('🆔 ID:', res.id);
      console.log('📅 Date:', res.date);
      console.log('🔧 Service:', res.service);
      console.log('   └─ Nom service:', res.service?.nom_service);
      console.log('   └─ Prestataire:', res.service?.prestataire);
      console.log('      └─ Nom:', res.service?.prestataire?.nom);
      console.log('      └─ Prénom:', res.service?.prestataire?.prenom);
      console.log('      └─ Prix:', res.service?.prestataire?.prix);
      console.log('👤 Prestataire direct:', res.prestataire);
      console.log('💰 Prix direct:', res.prix);
      console.log('📝 Service name passé:', res.serviceName);
      
      setReservation(res);
    } else {
      console.warn('❌ Aucune donnée de réservation trouvée');
    }
    setLoading(false);
  }, [location]);


  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <section className="cart-thank section-bg padding-y-120">
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </section>
    );
  }

  // Si pas de réservation, rediriger ou afficher un message
  if (!reservation) {
    return (
      <section className="cart-thank section-bg padding-y-120">
        <div className="container container-two">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="alert alert-warning">
                <h3>⚠️ Aucune réservation trouvée</h3>
                <p className="mb-4">Les données de réservation sont introuvables.</p>
                <Link to="/" className="btn btn-main me-2">
                  Retour à l'accueil
                </Link>
                <Link to="/prestataires" className="btn btn-outline-main">
                  Voir les prestataires
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                Merci pour votre réservation !
              </h2>
              <div className="cart-thank__img">
                <img src="/assets/images/thumbs/done.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="padding-t-120">
          <div className="cart-thank__box">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="thank-card">
                  <h5 className="thank-card__title mb-3">Détails de Réservation</h5>
                  <ul className="list-text">
                    <li className="list-text__item flx-align flex-nowrap">
                      <span className="text text-heading fw-500 font-heading fw-700 font-18">
                        No Réservation.
                      </span>
                      <span className="text text-heading fw-500">
                        #{reservation?.id || 'N/A'}
                      </span>
                    </li>
                    <li className="list-text__item flx-align flex-nowrap">
                      <span className="text text-heading fw-500">Status de Réservation</span>
                      <span className="text">
                        {reservation?.statut === 'en_attente' ? 'En attente' : 
                         reservation?.statut === 'confirmee' ? 'Confirmée' : 
                         reservation?.statut === 'terminee' ? 'Terminée' : 
                         reservation?.statut === 'annulee' ? 'Annulée' : 'En attente'}
                      </span>
                    </li>
                    
                    <li className="list-text__item flx-align flex-nowrap">
                      <span className="text text-heading fw-500">Date</span>
                      <span className="text">
                        {reservation?.date 
                          ? new Date(reservation.date).toLocaleDateString('fr-FR')
                          : 'N/A'}
                      </span>
                    </li>

                    {reservation?.heure && (
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">Heure </span>
                        <span className="text">{reservation.heure}</span>
                      </li>
                    )}

                    {reservation?.client_nom && (
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">Client </span>
                        <span className="text">
                          {reservation.client_prenom} {reservation.client_nom}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              
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
                      {reservation?.service?.prestataire 
                      ? `${reservation.service.prestataire.prenom || ''} ${reservation.service.prestataire.nom || ''}`.trim()
                      : 'N/A'}
                      </span>
                    </li>
                    <li className="list-text__item flx-align flex-nowrap">
                    <span className="text text-heading fw-500">
                      Service
                    </span>
                    <span className="text">
                      {reservation?.service?.categorie || 
                      reservation?.serviceName || 
                      'N/A'}
                    </span>
                  </li>
                  <li className="list-text__item flx-align flex-nowrap">
                    <span className="text text-heading fw-500">
                      Prix
                    </span>
                    <span className="text">
  {reservation?.service?.prestataire?.prix_heure
    ? `${parseFloat(reservation.service.prestataire.prix_heure).toFixed(2)} Dhs/H`
    : 'N/A'}
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
      </div>
    </section>
  );
}

export default CartThankYou;