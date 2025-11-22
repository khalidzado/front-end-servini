import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const SectionOne = () => {
  const [prestataires, setPrestataires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    villes: [],
    zones: [],
    categories: []
  });

  // État des filtres sélectionnés
  const [selectedFilters, setSelectedFilters] = useState({
    categorie: '',
    per_page: 8,
    page: 1
  });

  const [activeTab, setActiveTab] = useState('popular');

  // URL de votre API
  const API_BASE_URL = 'http://localhost:8000/api';

  // Fonction pour récupérer les prestataires
  const fetchPrestataires = async () => {
    setLoading(true);
    setError(null);

    try {
      // Construire les paramètres de requête
      const params = new URLSearchParams();
      
      // Si c'est l'onglet "populaire", on trie par nombre_prestations et on limite à 8
      if (activeTab === 'popular') {
        params.append('sort', 'nombre_prestations'); // Tri par nombre de prestations
        params.append('per_page', '8'); // Limiter à 8 résultats
      } else {
        // Pour les autres catégories
        if (selectedFilters.categorie) {
          params.append('categorie', selectedFilters.categorie);
        }
        
        // Ajouter la pagination seulement pour les catégories spécifiques
        params.append('per_page', selectedFilters.per_page);
        if (selectedFilters.page) {
          params.append('page', selectedFilters.page);
        }
      }

      const url = `${API_BASE_URL}/prestataires?${params.toString()}`;
      console.log('Fetching URL:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      setPrestataires(data.prestataires || []);
      
      // Ne pas afficher la pagination pour l'onglet "populaire"
      if (activeTab === 'popular') {
        setPagination(null);
      } else {
        setPagination(data.pagination);
      }
      
      // Mettre à jour les catégories
      if (data.filters && data.filters.categories) {
        setFilters(prev => ({
          ...prev,
          categories: data.filters.categories
        }));
      }
    } catch (err) {
      setError(err.message);
      console.error('Erreur complète:', err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les prestataires au montage et lors du changement de filtres ou de tab
  useEffect(() => {
    fetchPrestataires();
  }, [selectedFilters, activeTab]);

  // Gérer le changement de catégorie via les tabs
  const handleTabChange = (category) => {
    setActiveTab(category);
    if (category === 'popular') {
      // Réinitialiser les filtres pour l'onglet populaire
      setSelectedFilters(prev => ({ ...prev, categorie: '', page: 1 }));
    } else {
      // Pour les autres catégories
      setSelectedFilters(prev => ({ ...prev, categorie: category, page: 1 }));
    }
  };

  // Gérer le changement des filtres
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Composant carte prestataire
  const PrestataireCard = ({ prestataire }) => (
    <div className="col-xl-3 col-lg-4 col-sm-6">
      <div className="product-item">
        <div className="product-item__thumb d-flex">
          <Link to={`/profil/${prestataire.id}`} className="link w-100">
            <img
              src={prestataire.image}
              alt={`${prestataire.prenom} ${prestataire.nom}`}
              className="cover-img"
              onError={(e) => {
                e.target.src = '/assets/images/thumbs/product-img1.png';
              }}
            />
          </Link>
          <button type="button" className="product-item__wishlist">
            <i className="fas fa-heart" />
          </button>
        </div>
        <div className="product-item__content">
          <h6 className="product-item__title">
            <Link to={`/profil/${prestataire.id}`} className="link">
              {prestataire.prenom} {prestataire.nom}
            </Link>
          </h6>
          <div className="product-item__info flx-align gap-2 mb-4">
            <div className="flx-align gap-2">
              <svg fill="#000000" height="20px" width="20px" version="1.1" viewBox="0 0 368.666 368.666">
                <g>
                  <path d="M184.333,0C102.01,0,35.036,66.974,35.036,149.297c0,33.969,11.132,65.96,32.193,92.515c27.27,34.383,106.572,116.021,109.934,119.479l7.169,7.375l7.17-7.374c3.364-3.46,82.69-85.116,109.964-119.51c21.042-26.534,32.164-58.514,32.164-92.485C333.63,66.974,266.656,0,184.333,0z M285.795,229.355c-21.956,27.687-80.92,89.278-101.462,110.581c-20.54-21.302-79.483-82.875-101.434-110.552c-18.228-22.984-27.863-50.677-27.863-80.087C55.036,78.002,113.038,20,184.333,20c71.294,0,129.297,58.002,129.296,129.297C313.629,178.709,304.004,206.393,285.795,229.355z"/>
                  <path d="M184.333,59.265c-48.73,0-88.374,39.644-88.374,88.374c0,48.73,39.645,88.374,88.374,88.374s88.374-39.645,88.374-88.374S233.063,59.265,184.333,59.265z M184.333,216.013c-37.702,0-68.374-30.673-68.374-68.374c0-37.702,30.673-68.374,68.374-68.374s68.373,30.673,68.374,68.374C252.707,185.341,222.035,216.013,184.333,216.013z"/>
                </g>
              </svg>
              <h6 className="product-item__price mb-0 map">
                {prestataire.ville} - {prestataire.zone}
              </h6>
            </div>
          </div>
          <div className="product-item__info flx-between gap-2">
            <span className="product-item__author">
              <Link
                to={`/profil/${prestataire.id}`}
                className="link hover-text-decoration-underline"
              >
                {prestataire.service.categorie}
              </Link>
            </span>
            <div className="flx-align gap-2">
              <h6 className="product-item__price mb-0">{prestataire.prix_heure} Dhs/H</h6>
            </div>
          </div>
          <div className="product-item__bottom flx-between gap-2">
            <div>
              <span className="product-item__sales font-14 mb-2">
                {prestataire.nombre_prestations} Prestations
              </span>
              <div className="d-flex align-items-center gap-1">
                <ul className="star-rating">
                  {[...Array(5)].map((_, index) => (
                    <li key={index} className="star-rating__item font-11">
                      <i className={`fas fa-star ${index < Math.floor(prestataire.note_moyenne) ? '' : 'text-muted'}`} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              to={`/profil/${prestataire.id}`}
              className="btn btn-outline-light btn-sm pill"
            >
              voir plus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="arrival-product padding-y-120 section-bg position-relative z-index-1">
      <img
        src="/assets/images/gradients/home33.png"
        alt=""
        className="bg--gradient white-version"
      />
      <img
        src="/assets/images/shapes/elem2.png"
        alt=""
        className="element one"
      />
      <div className="container container-two">
        <div className="section-heading">
          <h3 className="section-heading__title">Nos prestataires</h3>
        </div>

        {/* Tabs des catégories */}
        <ul
          className="nav common-tab justify-content-center nav-pills mb-48"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'popular' ? 'active' : ''}`}
              onClick={() => handleTabChange('popular')}
              type="button"
            >
              Prestataires populaires
            </button>
          </li>
          {filters.categories.map((cat, index) => (
            <li key={index} className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === cat.nom ? 'active' : ''}`}
                onClick={() => handleTabChange(cat.nom)}
                type="button"
              >
                {cat.nom}
              </button>
            </li>
          ))}
        </ul>

        {/* Contenu */}
        <div className="tab-content" id="pills-tabContent">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : prestataires.length === 0 ? (
            <div className="alert alert-info" role="alert">
              Aucun prestataire trouvé avec ces critères.
            </div>
          ) : (
            <>
              <div className="row gy-4">
                {prestataires.map((prestataire) => (
                  <PrestataireCard key={prestataire.id} prestataire={prestataire} />
                ))}
              </div>

              {/* Pagination - Seulement pour les catégories spécifiques */}
              {activeTab !== 'popular' && pagination && pagination.last_page > 1 && (
                <div className="pagination-section mt-5">
                  <nav>
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handleFilterChange('page', pagination.current_page - 1)}
                          disabled={pagination.current_page === 1}
                        >
                          Précédent
                        </button>
                      </li>
                      {[...Array(pagination.last_page)].map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${pagination.current_page === index + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handleFilterChange('page', index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handleFilterChange('page', pagination.current_page + 1)}
                          disabled={pagination.current_page === pagination.last_page}
                        >
                          Suivant
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>

        <div className="text-center mt-64">
          <Link
            to="/all-providers"
            className="btn btn-main btn-lg pill fw-300"
          >
            Choisir les prestataires selon vos besoins
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;