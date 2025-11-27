import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

const AllProviders = () => {
  const [activeButton, setActiveButton] = useState("grid-view");
  const [filter, setFilter] = useState(false);
  
  // États pour les données de l'API
  const [prestataires, setPrestataires] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({ villes: [], zones: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour les filtres sélectionnés
  const [selectedVille, setSelectedVille] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6); // 6 éléments par page par défaut

  // --- DONNÉES GÉOGRAPHIQUES DYNAMIQUES COMPLÈTES ---
  // Mise à jour avec El Jadida, Salé et corrections d'accents
  const villesZones = {
    "Agadir": [
      "Centre-ville", "Talborjt", "Dakhla", "Hay Salam", "Al Houda", 
      "Bensergao", "Anza", "Tikiouine", "Ihzchach", "Hay Mohammadi"
    ],
    "Casablanca": [
      "Maârif", "Sidi Bernoussi", "Ain Sebaâ", "Hay Mohammadi", 
      "Derb Sultan", "Sidi Moumen", "Hay Hassani", "Oulfa", "Bourgogne", "Bernoussi"
    ],
    "Rabat": [
      "Agdal", "Hay Riad", "Yacoub El Mansour", "Takaddoum", 
      "L'Océan", "Hassan", "Akkari", "Souissi"
    ],
    "Salé": [
      "Tabriquet", "Bettana", "Hay Karima", "Sala Al Jadida", 
      "Sidi Moussa", "Hay Rahma", "Laayayda", "Kariat Oulad Moussa"
    ],
    "Marrakech": [
      "Gueliz", "Médina", "Daoudiate", "Sidi Youssef Ben Ali", 
      "Mhamid", "Al Massira", "Azli", "Targa"
    ],
    "Tanger": [
      "Beni Makada", "Mesnana", "Dradeb", "Moghogha", 
      "Playa", "Val Fleuri", "Bir Chifa", "Malabata"
    ],
    "Fès": [
      "Saiss", "Narjiss", "Ville Nouvelle", "Médina", 
      "Zouagha", "Bensouda", "Atlas"
    ],
    "Meknès": [
      "Hamria", "Ville Nouvelle", "Sidi Baba", "Wislane", 
      "Bassin", "Marjane", "Belle Vue", "Plaisance"
    ],
    "Oujda": [
      "Centre Ville", "Lazaret", "Al Qods", "Al Wahda", 
      "Sidi Yahya", "Village Couture", "Hay Andalous"
    ],
    "Kénitra": [
      "Centre Ville", "Maamora", "Saknia", "Ouled Oujih", 
      "Bir Rami", "Val Fleuri", "La Ville Haute"
    ],
    "Tétouan": [
      "Centre Ville", "Martil", "M'diq", "Saniat Rmel", 
      "Touila", "Coelma", "Ain Khabbaz", "Wilaya"
    ],
    "El Jadida": [
      "Centre Ville", "Sidi Bouzid", "El Manar", "Hay Salam", 
      "Najmat", "Al Matar", "Cité Portugaise"
    ],
    "Safi": [
      "Centre Ville", "Plateau", "Biada", "Kouki", 
      "Sidi Bouzid", "Jrifat", "Azib Derai"
    ],
    "Mohammedia": [
      "Centre Ville", "El Alia", "Rachidia", "Monica", 
      "La Colline", "Kasbah"
    ]
  };
  
  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  // Fonction pour parser la chaîne de prix
  const getPriceParams = (priceString) => {
    if (!priceString || !priceString.includes('-')) {
        return { prix_min: null, prix_max: null };
    }
    const parts = priceString.split('-').map(p => parseInt(p.replace(/\D/g, '')));
    return { prix_min: parts[0] || null, prix_max: parts[1] || null };
  };

  // useEffect pour récupérer les données
  useEffect(() => {
    const fetchPrestataires = async () => {
      setLoading(true);
      setError(null);
      
      const { prix_min, prix_max } = getPriceParams(selectedPrice);

      // Construire les paramètres de la requête
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('per_page', perPage); // Ajouter per_page
      if (selectedVille) params.append('ville', selectedVille);
      if (selectedZone) params.append('zone', selectedZone);
      if (selectedCategory) params.append('categorie', selectedCategory);
      if (selectedRating) params.append('note_min', selectedRating);
      if (prix_min) params.append('prix_min', prix_min);
      if (prix_max) params.append('prix_max', prix_max);
      
      const apiUrl = `/api/prestataires?${params.toString()}`;

      try {
        console.log('Fetching from:', apiUrl);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error('Response is not JSON:', text.substring(0, 200));
          throw new Error("La réponse du serveur n'est pas au format JSON");
        }

        const data = await response.json();
        console.log('API Response:', data);

        setPrestataires(data.prestataires || []);
        
        // Vérifier que la pagination est bien définie
        if (data.pagination) {
          setPagination(data.pagination);
        }
        
        if (data.filters) {
          setFilters(data.filters);
        }
        
      } catch (error) {
        console.error("Erreur lors de la récupération des prestataires:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrestataires();
  }, [currentPage, perPage, selectedVille, selectedZone, selectedCategory, selectedRating, selectedPrice]);

  // Gestion du changement de page
  const handlePageChange = (page) => {
    if (!pagination) {
      return;
    }
    
    if (page < 1 || page > pagination.last_page) {
      return;
    }
    
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Reset un filtre spécifique
  const resetFilter = (filterName) => {
    switch(filterName) {
        case 'ville':
            setSelectedVille('');
            setSelectedZone(''); // Reset zone aussi quand on reset ville
            break;
        case 'zone':
            setSelectedZone('');
            break;
        case 'price':
            setSelectedPrice('');
            break;
        default:
            break;
    }
    setCurrentPage(1);
  };

  // Reset tous les filtres
  const resetAllFilters = () => {
    setSelectedVille('');
    setSelectedZone('');
    setSelectedPrice('');
    setSelectedCategory('');
    setSelectedRating('');
    setCurrentPage(1);
  };

  // Générer les étoiles de notation
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-warning" />);
    }
    
    if (hasHalfStar && fullStars < 5) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-warning" />);
    }
    
    return stars;
  };

  // Générer les boutons de pagination
  const renderPagination = () => {
    if (!pagination) {
      return null;
    }
    
    if (pagination.last_page <= 1) {
      return null;
    }

    const pages = [];
    const current = pagination.current_page;
    const last = pagination.last_page;

    // Bouton Précédent
    pages.push(
      <li key="prev" className={`page-item ${current === 1 ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={() => handlePageChange(current - 1)}
          disabled={current === 1}
        >
          <i className="las la-arrow-left" />
        </button>
      </li>
    );

    // Première page
    if (current > 3) {
      pages.push(
        <li key={1} className="page-item">
          <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
        </li>
      );
      if (current > 4) {
        pages.push(<li key="dots1" className="page-item disabled"><span className="page-link">...</span></li>);
      }
    }

    // Pages autour de la page actuelle
    for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
      pages.push(
        <li key={i} className={`page-item ${i === current ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }

    // Dernière page
    if (current < last - 2) {
      if (current < last - 3) {
        pages.push(<li key="dots2" className="page-item disabled"><span className="page-link">...</span></li>);
      }
      pages.push(
        <li key={last} className="page-item">
          <button className="page-link" onClick={() => handlePageChange(last)}>{last}</button>
        </li>
      );
    }

    // Bouton Suivant
    pages.push(
      <li key="next" className={`page-item ${current === last ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={() => handlePageChange(current + 1)}
          disabled={current === last}
        >
          <i className="las la-arrow-right" />
        </button>
      </li>
    );

    return pages;
  };

  // CALCULER LES ZONES À AFFICHER
  // Si une ville est sélectionnée, on utilise la liste mappée dans villesZones
  // Sinon, on utilise toutes les zones retournées par l'API
  const zonesToDisplay = selectedVille 
    ? (villesZones[selectedVille] || [])
    : (filters.zones || []);

  return (
    <section className={`all-product padding-y-120 ${activeButton === "list-view" ? "list-view" : ""}`}>
      <div className="container container-two">
        <div className="row">
          <div className="col-lg-12">
            <div className="filter-tab gap-3 flx-between mb-4">
              <button
                type="button"
                className="filter-tab__button btn btn-outline-light pill d-flex align-items-center"
                onClick={handleFilter}
              >
                <span className="icon icon-left">
                  <img src="/assets/images/icons/filter.svg" alt="" />
                </span>
                <span className="font-18 fw-500">Filtres</span>
              </button>
              
              
              <div className="list-grid d-flex align-items-center gap-2">
                <button className="list-grid__button sidebar-btn text-body d-lg-none d-flex" onClick={handleFilter}>
                  <i className="las la-bars" />
                </button>
              </div>
            </div>
            
            {/* Formulaire de filtre */}
            <div className="filter-form pb-4 d-block">
              <div className="row gy-3">
                {/* Filtre Villes */}
                <div className="col-sm-4 col-xs-6">
                  <div className="flx-between gap-1">
                    <label htmlFor="ville" className="form-label font-16">Ville</label>
                    <button type="button" className="text-body font-14" onClick={() => resetFilter('ville')}>Effacer</button>
                  </div>
                  <div className="position-relative select-has-icon">
                    <select 
                        id="ville" 
                        className="common-input border-gray-five" 
                        value={selectedVille}
                        onChange={(e) => { 
                            setSelectedVille(e.target.value); 
                            setSelectedZone(''); // Reset zone quand la ville change
                            setCurrentPage(1); 
                        }}
                    >
                      <option value="">Sélectionner une ville</option>
                      {Object.keys(villesZones).sort().map((ville, index) => (
                        <option key={index} value={ville}>{ville}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Filtre Zones (DYNAMIQUE) */}
                <div className="col-sm-4">
                  <div className="flx-between gap-1">
                    <label htmlFor="zone" className="form-label font-16">Zone</label>
                    <button type="button" className="text-body font-14" onClick={() => resetFilter('zone')}>Effacer</button>
                  </div>
                  <div className="position-relative select-has-icon">
                    <select 
                        id="zone" 
                        className="common-input border-gray-five" 
                        value={selectedZone}
                        onChange={(e) => { setSelectedZone(e.target.value); setCurrentPage(1); }}
                        disabled={!selectedVille} // Optionnel : désactiver si vide
                    >
                      <option value="">
                        {selectedVille ? "Sélectionner un Zone" : "Choisir une ville d'abord"}
                      </option>
                      {zonesToDisplay.map((zone, index) => (
                        <option key={index} value={zone}>{zone}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Filtre Prix */}
                <div className="col-sm-4 col-xs-6">
                  <div className="flx-between gap-1">
                    <label htmlFor="Price" className="form-label font-16">Prix</label>
                    <button type="button" className="text-body font-14" onClick={() => resetFilter('price')}>Effacer</button>
                  </div>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="common-input border-gray-five"
                      id="Price"
                      placeholder="ex: 70-500"
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      onBlur={() => setCurrentPage(1)}
                    />
                  </div>
                </div>
              </div>
              
            
            </div>
          </div>
          
          <div className="col-xl-3 col-lg-4">
            {/* Filter Sidebar */}
            <div className={`filter-sidebar ${filter && "show"}`}>
              <button
                type="button"
                className="filter-sidebar__close p-2 position-absolute end-0 top-0 z-index-1 text-body hover-text-main font-20 d-lg-none d-block"
                onClick={handleFilter}
              >
                <i className="las la-times" />
              </button>
              
              {/* Filtre Catégories */}
              <div className="filter-sidebar__item">
                <button
                  type="button"
                  className="filter-sidebar__button font-16 text-capitalize fw-500"
                >
                  Services
                </button>
                <div className="filter-sidebar__content">
                  <ul className="filter-sidebar-list">
                    <li className="filter-sidebar-list__item">
                      <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory(''); setCurrentPage(1); }} 
                           className={`filter-sidebar-list__text ${selectedCategory === '' ? 'active' : ''}`}>
                        Tous les Services
                      </a>
                    </li>
                    {filters.categories && filters.categories.map((cat, index) => (
                      <li key={index} className="filter-sidebar-list__item">
                        <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory(cat.nom); setCurrentPage(1); }} 
                           className={`filter-sidebar-list__text ${selectedCategory === cat.nom ? 'active' : ''}`}>
                          {cat.nom} <span className="qty">({cat.count})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Filtre Évaluations */}
              <div className="filter-sidebar__item">
                <button
                  type="button"
                  className="filter-sidebar__button font-16 text-capitalize fw-500"
                >
                  Évaluations
                </button>
                <div className="filter-sidebar__content">
                  <ul className="filter-sidebar-list">
                    {[
                      { label: "Afficher tout", value: "" },
                      { label: "5 étoiles", value: "5" },
                      { label: "4 étoiles et plus", value: "4" },
                      { label: "3 étoiles et plus", value: "3" },
                      { label: "2 étoiles et plus", value: "2" },
                      { label: "1 étoile et plus", value: "1" },
                    ].map((rating, index) => (
                        <li key={index} className="filter-sidebar-list__item">
                            <div className="filter-sidebar-list__text">
                                <div className="common-check common-radio">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="radioRating"
                                    id={`rating-${index}`}
                                    value={rating.value}
                                    checked={selectedRating === rating.value}
                                    onChange={(e) => { setSelectedRating(e.target.value); setCurrentPage(1); }}
                                />
                                <label className="form-check-label" htmlFor={`rating-${index}`}>
                                    {rating.label}
                                </label>
                                </div>
                            </div>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-9 col-lg-8">
            {/* Affichage des erreurs */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="las la-exclamation-circle"></i> <strong>Erreur:</strong> {error}
                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                <hr />
                <p className="mb-0 small">
                  Vérifiez que votre serveur Laravel est démarré et que l'URL de l'API est correcte.
                </p>
              </div>
            )}

            {/* Liste des Prestataires */}
            <div className="row gy-4 list-grid-wrapper">
              {loading ? (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                  </div>
                  <p className="mt-3">Chargement des prestataires...</p>
                </div>
              ) : prestataires.length > 0 ? (
                prestataires.map(prestataire => (
                  <div key={prestataire.id} className="col-xl-4 col-sm-6">
                    <div className="product-item section-bg">
                      <div className="product-item__thumb d-flex">
                        <Link to={`/profil/${prestataire.id}`} className="link w-100"> 
                          <img
                            src={prestataire.image}
                            alt={`${prestataire.prenom} ${prestataire.nom}`}
                            className="cover-img"
                            onError={(e) => {
                              e.target.src = '/assets/images/default-avatar.jpg';
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
                        <div className="product-item__info flx-align gap-2 mb-3">
                          <div className="flx-align gap-2">
                            <svg fill="#000000" height="16px" width="16px" version="1.1" viewBox="0 0 368.666 368.666">
                              <g>
                                <path d="M184.333,0C102.01,0,35.036,66.974,35.036,149.297c0,33.969,11.132,65.96,32.193,92.515c27.27,34.383,106.572,116.021,109.934,119.479l7.169,7.375l7.17-7.374c3.364-3.46,82.69-85.116,109.964-119.51c21.042-26.534,32.164-58.514,32.164-92.485C333.63,66.974,266.656,0,184.333,0z M285.795,229.355c-21.956,27.687-80.92,89.278-101.462,110.581c-20.54-21.302-79.483-82.875-101.434-110.552c-18.228-22.984-27.863-50.677-27.863-80.087C55.036,78.002,113.038,20,184.333,20c71.294,0,129.297,58.002,129.296,129.297C313.629,178.709,304.004,206.393,285.795,229.355z" />
                                <path d="M184.333,59.265c-48.73,0-88.374,39.644-88.374,88.374c0,48.73,39.645,88.374,88.374,88.374s88.374-39.645,88.374-88.374S233.063,59.265,184.333,59.265z M184.333,216.013c-37.702,0-68.374-30.673-68.374-68.374c0-37.702,30.673-68.374,68.374-68.374s68.373,30.673,68.374,68.374C252.707,185.341,222.035,216.013,184.333,216.013z" />
                              </g>
                            </svg>
                            <span className="font-14 text-muted">{prestataire.ville} - {prestataire.zone}</span>
                          </div>
                        </div>
                        <div className="product-item__info flx-between gap-2 mb-3">
                          <span className="product-item__author">
                            <Link to={`/profil/${prestataire.id}`} className="link hover-text-decoration-underline">
                              {prestataire.service?.categorie || 'N/A'}
                            </Link>
                          </span>
                          <div className="flx-align gap-2">
                            <h6 className="product-item__price mb-0 text-primary">{prestataire.prix_heure} Dhs/H</h6>
                          </div>
                        </div>
                        <div className="product-item__bottom flx-between gap-2">
                          <div>
                            <span className="product-item__sales font-14 mb-2 d-block">
                              {prestataire.nombre_prestations || 0} prestations
                            </span>
                            <div className="d-flex align-items-center gap-1">
                              <div className="d-flex gap-1">
                                {renderStars(prestataire.note_moyenne || 0)}
                              </div>
                            
                            </div>
                          </div>
                          <Link to={`/profil/${prestataire.id}`} className="btn btn-outline-light pill">
                            Voir profil
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="las la-search font-60 text-muted mb-3 d-block"></i>
                  <h5>Aucun prestataire trouvé</h5>
                  <p className="text-muted">Essayez de modifier vos critères de recherche</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
              <nav className="mt-5" aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  {renderPagination()}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProviders;