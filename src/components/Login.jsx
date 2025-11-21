import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
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

    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
    };

    try {
      // ---------------------------------------------------------
      // 1. TENTATIVE DE CONNEXION ADMIN
      // ---------------------------------------------------------
      const resAdmin = await fetch("http://localhost:8000/api/admin/login", requestOptions);
      
      if (resAdmin.ok) {
        const dataAdmin = await resAdmin.json();
        
        // Sauvegarder les infos Admin
        localStorage.setItem("auth_token", dataAdmin.token);
        localStorage.setItem("user_info", JSON.stringify(dataAdmin.admin));
        localStorage.setItem("user_role", "admin"); // Rôle important
        
        // Redirection vers le Dashboard Admin
        navigate("/dashboard-admin");
        return; // On s'arrête ici, succès !
      }

      // ---------------------------------------------------------
      // 2. TENTATIVE DE CONNEXION PRESTATAIRE (Si Admin a échoué)
      // ---------------------------------------------------------
      const resPrestataire = await fetch("http://localhost:8000/api/prestataire/login", requestOptions);
      const dataPrestataire = await resPrestataire.json();

      if (resPrestataire.ok) {
        // Sauvegarder les infos Prestataire
        localStorage.setItem("auth_token", dataPrestataire.token);
        localStorage.setItem("user_info", JSON.stringify(dataPrestataire.prestataire)); // Vérifiez si votre API renvoie 'prestataire' ou 'user'
        localStorage.setItem("user_role", "prestataire"); // Rôle important
        
        // Redirection vers le Dashboard Prestataire classique
        navigate("/dashboard");
        return; // Succès !
      }

      // ---------------------------------------------------------
      // 3. GESTION DES ERREURS (Si les deux ont échoué)
      // ---------------------------------------------------------
      if (dataPrestataire.errors) {
        // Erreurs de validation Laravel (ex: email mal formé)
        setErrors(dataPrestataire.errors);
      } else {
        // Erreur générale (ex: mot de passe incorrect)
        setErrors({ general: "Email ou mot de passe incorrect." });
      }

    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Erreur de connexion au serveur. Vérifiez votre connexion." });
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

        <div className="account__right padding-y-120 flx-align">
          <div className="account-content">
            <Link to="/" className="logo mb-64">
              <img
                src="/assets/images/logo/logo-homev1.png"
                alt=""
                className="white-version"
              />
              <img
                src="/assets/images/logo/logo-homev2.svg"
                alt=""
                className="dark-version"
              />
            </Link>

            <h4 className="account-content__title mb-48 text-capitalize">
              Connexion
            </h4>

            {/* Message de succès (après inscription par exemple) */}
            {successMessage && (
              <div className="alert alert-success mb-3" role="alert">
                {successMessage}
              </div>
            )}

            {/* Message d'erreur global */}
            {errors.general && (
              <div className="alert alert-danger mb-3" role="alert">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row gy-4">
                <div className="col-12">
                  <label
                    htmlFor="email"
                    className="form-label mb-2 font-18 font-heading fw-600"
                  >
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
                      placeholder="exemple@mail.com"
                    />
                    <span className="input-icon">
                      <img src="/assets/images/icons/envelope-icon.svg" alt="" />
                    </span>
                  </div>
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="col-12">
                  <label
                    htmlFor="password"
                    className="form-label mb-2 font-18 font-heading fw-600"
                  >
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
                      placeholder="Votre mot de passe ..."
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
                  <div className="flx-between gap-1">
                    <Link
                      to="#"
                      className="forgot-password text-decoration-underline text-main text-poppins font-14"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-main btn-lg w-100 pill"
                    disabled={loading}
                  >
                    {loading ? "Connexion en cours..." : "Se connecter"}
                  </button>
                </div>

                <div className="col-sm-12 mb-0">
                  <div className="have-account">
                    <p className="text font-14">
                      Nouveau sur la plateforme Servini ?{" "}
                      <Link
                        className="link text-main text-decoration-underline fw-500"
                        to="/register"
                      >
                        S'inscrire
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

export default Login;