import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ✅ Récupération des clés critiques
  const { prestataireId, prestataireName, service, prix, serviceId } = location.state || {};

  // États pour le formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    date: '',
    heure: '',
    adresse: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); 

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Effacer l'erreur du champ modifié si elle est présente
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  // Validation du formulaire côté client
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = 'Le nom est obligatoire';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est obligatoire';
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est obligatoire';
    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.date) newErrors.date = 'La date est obligatoire';
    if (!formData.heure) newErrors.heure = "L'heure est obligatoire";
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est obligatoire";
    if (!formData.description.trim()) newErrors.description = 'La description est obligatoire';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si les données du prestataire sont présentes, y compris l'ID du service
    if (!prestataireId || !serviceId) {
      alert("Erreur: Informations du prestataire ou du service manquantes. Veuillez retourner à la page du prestataire.");
      return;
    }

    // Valider le formulaire côté client
    if (!validateForm()) {
      alert("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setLoading(true);

    const reservationData = {
      // Infos du client
      nom: formData.nom,
      prenom: formData.prenom,
      telephone: formData.telephone,
      email: formData.email,
      date: formData.date,
      heure: formData.heure,
      adresse: formData.adresse,
      description_besoin: formData.description,
      
      // ✅ Clé attendue par Laravel pour la relation
      service_id: serviceId,
      // ✅ Clé pour satisfaire la validation 'service' => 'required'
      service : service, 
    };

    try {
      const response = await fetch('http://localhost:8000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(reservationData)
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Données reçues du backend:', data.data);
        console.log('📝 Données à passer:', {
          serviceName: service,
          prix: prix,
          prestataireName: prestataireName
        });
        
        navigate('/thank-you', { 
          state: { 
            reservation: {
              ...data.data,
              serviceName: service,      // ✅ Utilise la variable récupérée
              prix: prix,                    // ✅ Utilise la variable récupérée
              prestataireName: prestataireName  // ✅ Utilise la variable récupérée
            }
          },
          replace: true
        });
      } if (data.success) {
        console.log('✅ Données reçues du backend:', data.data);
        
        navigate('/thank-you', { // Assurez-vous que l'URL est bien /cart-thank-you
          state: { 
            reservation: data.data,
            serviceName: service,
              prix: prix

          },
          replace: true
        });
    }else {
        // Afficher les erreurs de validation côté serveur
        if (data.errors) {
          // Fusionner les erreurs du serveur avec l'état local
          setErrors(prev => ({ ...prev, ...data.errors })); 
        }
        alert('Erreur: ' + data.message || 'Une erreur inconnue est survenue.');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert('Erreur lors de la création de la réservation. Veuillez vérifier votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si les données critiques sont présentes
  if (!prestataireId) {
    return (
      <section className="cart-personal padding-y-120">
        <div className="container container-two">
          <div className="alert alert-warning">
            <h4>Informations manquantes</h4>
            <p>Veuillez sélectionner un prestataire avant de faire une réservation.</p>
            <Link to="/all-providers" className="btn btn-main">
              Voir les prestataires
            </Link>
          </div>
        </div>
      </section>
    );
  }
  
  // Utilitaire pour le rendu du prix dans le résumé
  const displayPrice = prix ? `${parseFloat(prix).toFixed(2)} Dhs/H` : 'N/A';


  return (
    <section className="cart-personal padding-y-120">
      <div className="container container-two">
        <div className="row gy-5">
          
          <div className="col-lg-8 pe-sm-5">
            <div className="cart-personal__content">
              <h5 className="cart-personal__title mb-32">Informations personnelles</h5>
              <form onSubmit={handleSubmit}>
                <div className="row gy-4">
                  
                  {/* Champ Nom */}
                  <div className="col-6">
                    <label htmlFor="nom" className="form-label font-18 mb-2 fw-500 font-heading">
                      Nom <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className={`common-input ${errors.nom ? 'is-invalid' : ''}`}
                        id="nom"
                        placeholder="Votre Nom ..."
                        value={formData.nom}
                        onChange={handleChange}
                      />
                      {errors.nom && <small className="text-danger">{errors.nom}</small>}
                    </div>
                  </div>

                  {/* Champ Prénom */}
                  <div className="col-6">
                    <label htmlFor="prenom" className="form-label font-18 mb-2 fw-500 font-heading">
                      Prénom <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className={`common-input ${errors.prenom ? 'is-invalid' : ''}`}
                        id="prenom"
                        placeholder="Votre Prénom ..."
                        value={formData.prenom}
                        onChange={handleChange}
                      />
                      {errors.prenom && <small className="text-danger">{errors.prenom}</small>}
                    </div>
                  </div>

                  {/* Champ Téléphone */}
                  <div className="col-12">
                    <label htmlFor="telephone" className="form-label font-18 mb-2 fw-500 font-heading">
                      Numéro de téléphone <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="tel"
                        className={`common-input ${errors.telephone ? 'is-invalid' : ''}`}
                        id="telephone"
                        placeholder="06XXXXXXXX"
                        value={formData.telephone}
                        onChange={handleChange}
                      />
                      {errors.telephone && <small className="text-danger">{errors.telephone}</small>}
                    </div>
                  </div>

                  {/* Champ Email */}
                  <div className="col-12">
                    <label htmlFor="email" className="form-label mb-2 font-18 font-heading fw-500">
                      Email <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="email"
                        className={`common-input ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        placeholder="infoname@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                  </div>

                  {/* Champ Date */}
                  <div className="col-6">
                    <label htmlFor="date" className="form-label font-18 mb-2 fw-500 font-heading">
                      Date <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="date"
                        className={`common-input ${errors.date ? 'is-invalid' : ''}`}
                        id="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleChange}
                      />
                      {errors.date && <small className="text-danger">{errors.date}</small>}
                    </div>
                  </div>

                  {/* Champ Heure */}
                  <div className="col-6">
                    <label htmlFor="heure" className="form-label font-18 mb-2 fw-500 font-heading">
                      Heure <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="time"
                        className={`common-input ${errors.heure ? 'is-invalid' : ''}`}
                        id="heure"
                        placeholder="choisir l'heure ..."
                        value={formData.heure}
                        onChange={handleChange}
                      />
                      {errors.heure && <small className="text-danger">{errors.heure}</small>}
                    </div>
                  </div>

                  {/* Champ Adresse */}
                  <div className="col-12">
                    <label htmlFor="adresse" className="form-label font-18 mb-2 fw-500 font-heading">
                      Adresse <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className={`common-input ${errors.adresse ? 'is-invalid' : ''}`}
                        id="adresse"
                        placeholder="remplir votre adresse exact ..."
                        value={formData.adresse}
                        onChange={handleChange}
                      />
                      {errors.adresse && <small className="text-danger">{errors.adresse}</small>}
                    </div>
                  </div>

                  {/* Champ Description */}
                  <div className="col-12">
                    <label htmlFor="description" className="form-label font-18 mb-2 fw-500 font-heading">
                      Description du besoin <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <textarea
                        className={`common-input ${errors.description ? 'is-invalid' : ''}`}
                        id="description"
                        placeholder="Veuillez décrire votre besoin de manière détaillée..."
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                      {errors.description && <small className="text-danger">{errors.description}</small>}
                    </div>
                  </div>
                </div>

                <div className="cart-content__bottom flx-between gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-light flx-align gap-2 pill btn-lg"
                  >
                    <span className="icon line-height-1 font-20">
                      <i className="las la-arrow-left" />
                    </span>
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="btn btn-main flx-align gap-2 pill btn-lg"
                    disabled={loading}
                  >
                    {loading ? 'Envoi en cours...' : 'Confirmer'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="order-summary">
              <h5 className="order-summary__title mb-32">Résumé de la Réservation</h5>
              <ul className="billing-list">
                <li className="billing-list__item flx-between">
                  <span className="text text-heading fw-500">Service</span>
                  <span className="amount text-heading fw-500">{service}</span>
                </li>
                <li className="billing-list__item flx-between">
                  <span className="text text-heading fw-500">Prestataire</span>
                  <span className="amount text-body">{prestataireName}</span>
                </li>
                <li className="billing-list__item flx-between">
                  <span className="text text-heading fw-500">Prix</span>
                  <span className="amount text-body">{displayPrice}</span>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reservation;