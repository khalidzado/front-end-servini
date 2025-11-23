import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';

function Profile() {
  const { id } = useParams(); // ✅ Utiliser 'id' partout
  const navigate = useNavigate();
  
  // États pour le prestataire
  const [prestataire, setPrestataire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeButton] = useState("grid-view");
  
  // États pour les avis
  const [avis, setAvis] = useState([]);
  const [noteMoyenne, setNoteMoyenne] = useState(0);
  const [nombreAvis, setNombreAvis] = useState(0);
  const [avisLoading, setAvisLoading] = useState(false);

  // États pour le formulaire de commentaire
  const [formData, setFormData] = useState({
    id_reservation: '',
    note: '',
    email: '',
    commentaire: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // ✅ Récupérer les infos du prestataire
  const fetchPrestataire = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/prestataires/${id}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setPrestataire(data.data);
      } else {
        setPrestataire(null);
      }
    } catch (error) {
      console.error('Erreur de récupération du prestataire:', error);
      setPrestataire(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // ✅ Récupérer les avis (CORRIGÉ: utilise 'id' au lieu de 'prestataireId')
  const fetchAvis = useCallback(async () => {
    if (!id) return;
    
    setAvisLoading(true);
    try {
      const url = `http://localhost:8000/api/prestataires/${id}/avis`;
      console.log('🔍 Fetching avis from:', url);
      
      const response = await fetch(url);
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('✅ Avis reçus:', data);
      
      setAvis(data.avis || []);
      setNoteMoyenne(data.note_moyenne || 0);
      setNombreAvis(data.nombre_avis || 0);
    } catch (err) {
      console.error("❌ Erreur fetch avis:", err);
      setAvis([]);
      setNoteMoyenne(0);
      setNombreAvis(0);
    } finally {
      setAvisLoading(false);
    }
  }, [id]);

  // ✅ Charger les données au montage (UN SEUL useEffect)
  useEffect(() => {
    fetchPrestataire();
    fetchAvis();
  }, [fetchPrestataire, fetchAvis]);

  // Gérer la réservation
  const handleReserver = () => {
    if (!prestataire) return;
    
    navigate('/reservation', {
      state: {
        prestataireId: prestataire.id,
        prestataireName: `${prestataire.prenom} ${prestataire.nom}`,
        serviceId: prestataire.service_id,
        service: prestataire.service_name, 
        prix: prestataire.prix
      }
    });
  };

  // ✅ Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // ✅ Soumettre un avis
  const handleSubmitAvis = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.id_reservation || !formData.note || !formData.commentaire) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (formData.note < 1 || formData.note > 5) {
      alert("La note doit être entre 1 et 5");
      return;
    }

    setSubmitLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/avis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_reservation: formData.id_reservation,
          note: parseInt(formData.note),
          commentaire: formData.commentaire
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Avis ajouté avec succès !");
        setFormData({
          id_reservation: '',
          note: '',
          email: '',
          commentaire: ''
        });
        // Recharger les avis
        fetchAvis();
      } else {
        alert(data.message || "Erreur lors de l'ajout de l'avis");
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'avis:', error);
      alert("Erreur réseau lors de l'envoi de l'avis");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Fonction pour afficher les étoiles
  const renderStars = (note) => {
    return [...Array(5)].map((_, index) => (
      <li key={index} className="star-rating__item font-11">
        <i className={`fas fa-star ${index < note ? '' : 'text-muted'}`} />
      </li>
    ));
  };

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!prestataire) {
    return (
      <div className="container text-center py-5">
        <h3>Prestataire non trouvé</h3>
        <Link to="/" className="btn btn-main mt-3">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <section className={`profile pt-5 padding-b-120 ${activeButton === "list-view" ? "list-view" : ""}`}>
      <div className="container container-two">
        <div className="tab-content" id="pills-tabb">
          <div
            className="tab-pane fade show active"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex={0}
          >
            <div className="product-details mt-32 padding-b-120">
              <div className="container container-two">
                <div className="row gy-4">
                  <div className="col-lg-8">
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-product-details"
                        role="tabpanel"
                        aria-labelledby="pills-product-details-tab"
                        tabIndex={0}
                      >
                        {/* Prestataire Details Content */}
                        <div className="product-details">
                          <div className="product-details__thumb">
                            <img 
                              src={prestataire.image || "/assets/images/thumbs/Plomberie.png"} 
                              alt={`${prestataire.prenom} ${prestataire.nom}`} 
                            />
                          </div>
                          <div className="product-details__item mt-32">
                            <h5 className="product-details__title mb-3">
                              À propos du prestataire
                            </h5>
                            <p className="product-details__desc">
                              {prestataire.bio || "Aucune description disponible"}
                            </p>
                          </div>
                          <div className="product-details__item">
                            <h5 className="product-details__title mb-3">Informations de contact</h5>
                            <ul className="product-list">
                              <li className="product-list__item text-heading">
                                Email : {prestataire.email}
                              </li>
                              <li className="product-list__item text-heading">
                                Numéro de téléphone : {prestataire.telephone}
                              </li>
                            </ul>
                          </div>
                          <div className="product-details__item">
                            <h5 className="product-details__title mb-3">Adresse</h5>
                            <ul className="product-list">
                              <li className="product-list__item">Ville : {prestataire.ville}</li>
                              <li className="product-list__item">Zone : {prestataire.zone}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4">
                    {/* Sidebar Prix */}
                    <div className="product-sidebar section-bg mb-24">
                      <div className="product-sidebar__top position-relative flx-between gap-1">
                        <h6 className="product-sidebar__title">Prix</h6>
                        <h6 className="product-sidebar__title">
                          {prestataire.prix 
                            ? `${parseFloat(prestataire.prix).toFixed(2)} Dhs/H` 
                            : "N/A"}
                        </h6>
                      </div>
                      <button
                        className="btn-reserver btn btn-main d-flex w-100 justify-content-center align-items-center gap-2 pill px-sm-5 mt-32"
                        onClick={handleReserver}
                      >
                        Réserver
                      </button>
                    </div>
                     {/* ✅ Profil social (avec vérification null) */}
                     <div className="profile-sidebar__item">
                      <h5 className="profile-sidebar__title">Profil social</h5>
                      <ul className="social-icon-list">
                        {prestataire.facebook_url && (
                          <li className="social-icon-list__item">
                            <a
                              href={prestataire.facebook_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icon-list__link flx-center bg-white border-white text-heading font-18"
                            >
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                        )}
                        {prestataire.linkedin_url && (
                          <li className="social-icon-list__item">
                            <a
                              href={prestataire.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icon-list__link flx-center bg-white border-white text-heading font-18"
                            >
                              <i className="fab fa-linkedin-in" />
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                    

                    {/* ✅ Formulaire de commentaire FONCTIONNEL */}
                    <div className="profile-sidebar__item">
                      <h5 className="profile-sidebar__title">Votre commentaire !</h5>
                      <div>
                        <div className="row gy-4">
                          <div className="col-12">
                            <label htmlFor="id_reservation" className="form-label mb-2 font-18 fw-500">
                              Id de réservation *
                            </label>
                            <input
                              type="text"
                              className="common-input radius-8 common-input--md"
                              id="id_reservation"
                              placeholder="Ex: 12443"
                              value={formData.id_reservation}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="note" className="form-label mb-2 font-18 fw-500">
                              Note (1-5) *
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              className="common-input radius-8 common-input--md"
                              id="note"
                              placeholder="5"
                              value={formData.note}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="email" className="form-label mb-2 font-18 fw-500">
                              Email (optionnel)
                            </label>
                            <input
                              type="email"
                              className="common-input radius-8 common-input--md"
                              id="email"
                              placeholder="khalid@gmail.com"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="commentaire" className="form-label mb-2 font-18 fw-500">
                              Commentaire *
                            </label>
                            <textarea
                              className="common-input radius-8"
                              id="commentaire"
                              placeholder="Écrivez votre commentaire..."
                              value={formData.commentaire}
                              onChange={handleInputChange}
                              rows="4"
                            />
                          </div>
                          <div className="col-12">
                            <button 
                              onClick={handleSubmitAvis}
                              className="btn btn-main btn-md w-100"
                              disabled={submitLoading}
                            >
                              {submitLoading ? 'Envoi...' : 'Envoyer'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                   
                  </div>              
                </div>
              </div>
            </div>
          </div>    

          {/* ✅ Section des avis avec loading séparé */}
          <div
            className="tab-pane fade"
            id="pills-review"
            role="tabpanel"
            aria-labelledby="pills-review-tab"
            tabIndex={0}
          >
            <div className="product-review-wrapper">
              {avisLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement des avis...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 p-3 bg-light rounded">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <h3 className="mb-0">{noteMoyenne.toFixed(1)}</h3>
                        <ul className="star-rating d-flex gap-1 mb-0">
                          {renderStars(Math.round(noteMoyenne))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-0 text-muted">
                          Basé sur <strong>{nombreAvis}</strong> avis
                        </p>
                      </div>
                    </div>
                  </div>

                  {avis.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fas fa-comment-slash fa-3x text-muted mb-3"></i>
                      <p className="text-muted">Aucun avis pour le moment</p>
                    </div>
                  ) : (
                    avis.map((item) => (
                      <div key={item.id} className="product-review mb-3 pb-3 border-bottom">
                        <div className="product-review__top flx-between mb-2">
                          <div className="product-review__rating flx-align">
                            <div className="d-flex align-items-center gap-2">
                              <ul className="star-rating d-flex gap-1 mb-0">
                                {renderStars(item.note)}
                              </ul>
                              <span className="star-rating__text text-body fw-bold">
                                {item.note.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <div className="product-review__date text-muted">
                            <small>
                              par <strong>{item.client_prenom} {item.client_nom}</strong>
                            </small>
                            <br />
                            <small>{item.date}</small>
                          </div>
                        </div>
                        <div className="product-review__body">
                          <p className="product-review__desc mb-0">
                            {item.commentaire}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>   
        </div>
      </div>
    </section>
  );
}

export default Profile;