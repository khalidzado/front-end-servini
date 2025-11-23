import { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';

const BreadcrumbFour = () => {

  const { id } = useParams(); // ID du prestataire depuis l'URL
  const [prestataire, setPrestataire] = useState(null);
  const [loading, setLoading] = useState(true);
  
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


  useEffect(() => {
    fetchPrestataire();
  }, [id, fetchPrestataire]);

    
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!prestataire) {
    return <div>Prestataire non trouvé</div>;
  }

  const formattedMembershipDate = prestataire.membre_depuis 
    ? prestataire.membre_depuis
    : "Date non spécifiée";


  return (
    <section className="breadcrumb-three section-bg position-relative z-index-1 overflow-hidden">
      <img
        src="/assets/images/gradients/breadcrumb-gradient-bg.png"
        alt=""
        className="bg--gradient"
      />
      <img
        src="/assets/images/shapes/element-moon3.png"
        alt=""
        className="element one"
      />
      <img
        src="/assets/images/shapes/element-moon1.png"
        alt=""
        className="element three"
      />
      <div className="container container-two">
        <div className="breadcrumb-three-content border-bottom border-color">
          <div className="breadcrumb-three-content__inner">
            <div className="breadcrumb-three-content__left">
              <div className="flx-between align-items-end gap-3">
                <div className="author-profile d-flex gap-2 flex-column">
                  <div className="author-profile__thumb flex-shrink-0" style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid #e0e0e0',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img 
                      src={prestataire.photo} 
                      alt="photo-profil"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = '/assets/images/thumbs/product-img1.png';
                      }}
                    />
                  </div>
                  <div className="author-profile__info">
                    <h5 className="author-profile__name mb-2">
                      {prestataire.nom} {prestataire.prenom}
                    </h5>
                    <span className="author-profile__membership font-14">
                      Membre depuis {formattedMembershipDate}
                    </span>
                  </div>
                </div>
                <div className="breadcrumb-three-content__right flex-shrink-0 d-flex align-items-center gap-4 gap-lg-5">
                  <div className="author-rating">
                    <span className="author-rating__text text-heading fw-500 mb-2">
                      Évaluation de prestataire
                    </span>
                    <div className="d-flex align-items-center gap-1">
                      <ul className="star-rating">
                        {[...Array(5)].map((_, index) => (
                          <li key={index} className="star-rating__item font-11">
                            <i className={`fas fa-star ${index < Math.floor(prestataire.note_moyenne) ? '' : 'text-muted'}`} />
                          </li>
                        ))}
                      </ul>
                      <span className="star-rating__text text-body font-14">
                        {" "}
                        ({prestataire.nombre_avis} évaluations)
                      </span>
                    </div>
                  </div>
                  <div className="sales">
                    <span className="sales__text mb-1 text-heading fw-500">
                      Prestations
                    </span>
                    <h5 className="sales__amount mb-0">{prestataire.total_prestations || 0}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul
            className="nav tab-bordered nav-pills mt-4"
            id="pills-tabbs"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="true"
              >
                Profil de Prestataire
              </button>
            </li>
          
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-review-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-review"
                type="button"
                role="tab"
                aria-controls="pills-review"
                aria-selected="false"
              >
                Évaluations{" "}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BreadcrumbFour;