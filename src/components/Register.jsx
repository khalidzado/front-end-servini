import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    ville: "",
    zone: "",
    password: "",
    categorie: "",
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const villes = ["Agadir", "Casablanca", "Rabat", "Marrakech", "Tanger", "Fes"];
  const zones = ["Centre-ville", "Banlieue", "Zone industrielle", "Zone résidentielle"];
  const categories = ["Plomberie", "Électricité", "Menuiserie", "Peinture", "Jardinage", "Nettoyage"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.telephone.trim()) newErrors.telephone = "Le numéro de téléphone est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.ville) newErrors.ville = "La ville est requise";
    if (!formData.zone) newErrors.zone = "La zone est requise";
    if (!formData.categorie) newErrors.categorie = "La catégorie est requise";
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Vous devez accepter les termes et conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Update this URL to match your Laravel API endpoint
      const response = await fetch("http://localhost:8000/api/prestataire/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          telephone: formData.telephone,
          email: formData.email,
          ville: formData.ville,
          zone: formData.zone,
          password: formData.password,
          categorie: formData.categorie
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from Laravel
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || "Une erreur s'est produite" });
        }
        return;
      }

      // Success - redirect to login with success message
      navigate("/login", { 
        state: { message: "Inscription réussie! Vous pouvez maintenant vous connecter." } 
      });

    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Erreur de connexion au serveur" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================================== Account Page Start =========================== */}
      <section className="account d-flex">
        <div className="account__left d-md-flex d-none flx-align section-bg position-relative z-index-1 overflow-hidden">
          <img
            src="/assets/images/shapes/pattern-curve-seven.png"
            alt=""
            className="position-absolute end-0 top-0 z-index--1 h-100"
          />
          <div className="account-thumb">
            <img src="/assets/images/thumbs/inscription.png" alt="" />
            
          </div>
        </div>

        <div className="account__right padding-t-120 flx-align">
          

          <div className="account-content">
            <Link to="/" className="logo mb-64">
              <img
                src="/assets/images/logo/logo-homev1.png"
                alt=""
                className="white-version"
              />
              <img
                src="/assets/images/logo/white-logo-two.png"
                alt=""
                className="dark-version"
              />
            </Link>

            <h4 className="account-content__title mb-48 text-capitalize">
              Créer votre compte
            </h4>

            {errors.general && (
              <div className="alert alert-danger mb-3" role="alert">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row gy-4">
                <div className="col-6">
                  <label htmlFor="nom" className="form-label mb-2 font-18 font-heading fw-600">
                    Nom :
                  </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className={`common-input common-input--bg common-input--withIcon ${errors.nom ? 'is-invalid' : ''}`}
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Votre Nom ..."
                    />
                    <span className="input-icon">
                      <img src="/assets/images/icons/user-icon.svg" alt="" />
                    </span>
                  </div>
                  {errors.nom && <small className="text-danger">{errors.nom}</small>}
                </div>

                <div className="col-6">
                  <label htmlFor="prenom" className="form-label mb-2 font-18 font-heading fw-600">
                    Prénom :
                  </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className={`common-input common-input--bg common-input--withIcon ${errors.prenom ? 'is-invalid' : ''}`}
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="votre Prénom ..."
                    />
                    <span className="input-icon">
                      <img src="/assets/images/icons/user-icon.svg" alt="" />
                    </span>
                  </div>
                  {errors.prenom && <small className="text-danger">{errors.prenom}</small>}
                </div>

                <div className="col-12">
                  <label htmlFor="telephone" className="form-label mb-2 font-18 font-heading fw-600">
                    Numéro de téléphone
                  </label>
                  <div className="position-relative">
                    <input
                      type="tel"
                      className={`common-input common-input--bg common-input--withIcon ${errors.telephone ? 'is-invalid' : ''}`}
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="0632262095"
                    />
                    <span className="input-icon"></span>
                  </div>
                  {errors.telephone && <small className="text-danger">{errors.telephone}</small>}
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label mb-2 font-18 font-heading fw-600">
                    Email
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className={`common-input common-input--bg common-input--withIcon ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="infoname@mail.com"
                    />
                    <span className="input-icon">
                      <img src="/assets/images/icons/envelope-icon.svg" alt="" />
                    </span>
                  </div>
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="ville" className="form-label mb-2 font-18 font-heading fw-600">
                    Ville
                  </label>
                  <div className="select-has-icon">
                    <select
                      className={`common-input border ${errors.ville ? 'is-invalid' : ''}`}
                      id="ville"
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner une ville</option>
                      {villes.map((ville, index) => (
                        <option key={index} value={ville}>{ville}</option>
                      ))}
                    </select>
                  </div>
                  {errors.ville && <small className="text-danger">{errors.ville}</small>}
                </div>

                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="zone" className="form-label mb-2 font-18 font-heading fw-600">
                    Zone
                  </label>
                  <div className="select-has-icon">
                    <select
                      className={`common-input border ${errors.zone ? 'is-invalid' : ''}`}
                      id="zone"
                      name="zone"
                      value={formData.zone}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner une zone</option>
                      {zones.map((zone, index) => (
                        <option key={index} value={zone}>{zone}</option>
                      ))}
                    </select>
                  </div>
                  {errors.zone && <small className="text-danger">{errors.zone}</small>}
                </div>

                <div className="col-12">
                  <label htmlFor="categorie" className="form-label mb-2 font-18 font-heading fw-600">
                    Catégorie de service
                  </label>
                  <div className="select-has-icon">
                    <select
                      className={`common-input border ${errors.categorie ? 'is-invalid' : ''}`}
                      id="categorie"
                      name="categorie"
                      value={formData.categorie}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  {errors.categorie && <small className="text-danger">{errors.categorie}</small>}
                </div>

                <div className="col-12">
                  <label htmlFor="password" className="form-label mb-2 font-18 font-heading fw-600">
                    Mot de passe
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`common-input common-input--bg common-input--withIcon ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Remplir votre mot de passe"
                    />
                    <span
                      className="input-icon toggle-password cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src="/assets/images/icons/lock-icon.svg" alt="" />
                    </span>
                  </div>
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="col-12">
                  <div className="common-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="agreeTerms"
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label mb-0 fw-400 font-16 text-body"
                      htmlFor="agreeTerms"
                    >
                      J'accepte les termes &amp; conditions
                    </label>
                  </div>
                  {errors.agreeTerms && <small className="text-danger">{errors.agreeTerms}</small>}
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-main btn-lg w-100 pill"
                    disabled={loading}
                  >
                    {loading ? "Inscription en cours..." : "S'inscrire"}
                  </button>
                </div>

                <div className="col-sm-12 mb-0">
                  <div className="have-account">
                    <p className="text font-14">
                      Déjà Prestataire ?{" "}
                      <Link
                        className="link text-main text-decoration-underline fw-500"
                        to="/login"
                      >
                        Se connecter
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* ================================== Account Page End =========================== */}
    </>
  );
};

export default Register;