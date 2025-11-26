import React, { useState, useEffect } from "react";

const DashboardSetting = () => {
  const [bio, setBio] = useState("");
  const [prix, setPrix] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [carteIdentite, setCarteIdentite] = useState(null);

  const [loading, setLoading] = useState(false); // Chargement du formulaire
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const [status, setStatus] = useState("");
  const [hasCarte, setHasCarte] = useState(false); // Pour savoir si un fichier existe

  const handleFileChange = (e) => {
    setCarteIdentite(e.target.files[0]);
  };

  useEffect(() => {
    const fetchCurrentData = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setErrorMessage("Utilisateur non authentifie.");
        setPageLoading(false);
        return;
      }

      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      try {
        const response = await fetch(
          "http://localhost:8000/api/prestataire/parameter", 
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("Impossible de charger les donnees");
        }

        const data = await response.json();

        setBio(data.bio || "");
        setPrix(data.prix_heure || "0");
        setFacebookUrl(data.facebook_url || "");
        setLinkedinUrl(data.linkedin_url || "");
        
        setStatus(data.status || "pending");
        setHasCarte(!!data.carte_identite_path); 

      } catch (error) {
        console.error("Erreur fetchCurrentData:", error);
        setErrorMessage(
          "Erreur lors du chargement de vos informations."
        );
      } finally {
        setPageLoading(false);
      }
    };

    fetchCurrentData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("prix_heure", prix);
    formData.append("facebook_url", facebookUrl);
    formData.append("linkedin_url", linkedinUrl);

    if (carteIdentite) {
      formData.append("carte_identite", carteIdentite);
    }

    const headers = new Headers();
    headers.append("Accept", "application/json");
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    } else {
      setErrorMessage("Utilisateur non authentifie. Token non trouve.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/prestataire/parameter", // Route POST
        {
          method: "POST",
          headers: headers,
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message || "Une erreur est survenue.");
      } else {
        setMessage(data.message);
        if (carteIdentite) {
          setStatus("pending");
          setHasCarte(true);
        }
      }
    } catch (error) {
      console.error("Erreur de fetch:", error);
      setErrorMessage(
        "Impossible de contacter le serveur. Verifiez la console."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="dashboard-body__content">
        <p>Chargement de vos informations...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-body__content">
      <div className="card common-card">
        <div className="card-body">
          <div className="row gy-4">
            <div className="col-lg-12">
              <form onSubmit={handleSubmit}>
                <div
                  className="setting-content"
                  data-bs-spy="scroll"
                  data-bs-target="#sidebar-scroll-spy"
                >
                  <div
                    className="card common-card border border-gray-five overflow-hidden mb-24"
                    id="profile"
                  >
                    <div className="card-header">
                      <h6 className="title">Details</h6>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                       
                        <div className="col-12">
                          <label className="form-label">
                            Statut de votre pièce d'identité :
                          </label>
                          {status === "active" && (
                            <div className="alert alert-success" role="alert">
                              Approuvée
                            </div>
                          )}
                          {status === "rejected" && (
                            <div className="alert alert-danger" role="alert">
                              Rejetée (Veuillez soumettre une nouvelle pièce)
                            </div>
                          )}
                          {status === "pending" && hasCarte && (
                            <div className="alert alert-warning" role="alert">
                              En cours de traitement
                            </div>
                          )}
                          {status === "pending" && !hasCarte && (
                            <div className="alert alert-info" role="alert">
                              Aucune pièce soumise. Veuillez en télécharger une.
                            </div>
                          )}
                        </div>

                        <div className="col-sm-12 col-xs-12">
                          <label htmlFor="fileUpload" className="form-label">
                            {status === "active"
                              ? "Pièce d'identité (Approuvée)"
                              : "Soumettre / Remplacer la pièce d'identité"}
                          </label>
                          <input
                            type="file"
                            className="common-input common-input--md border--color-dark bg--white"
                            id="fileUpload"
                            onChange={handleFileChange}
                            disabled={status ==="active"}
                          />
                        </div>

                        <div className="col-sm-12">
                          <label htmlFor="aboutProfile" className="form-label">
                            Votre Bio
                          </label>
                          <textarea
                            className="common-input common-input--md border--color-dark bg--white"
                            id="aboutProfile"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12">
                          <label htmlFor="prix" className="form-label">
                            Prix/h en MAD
                          </label>
                          <input
                            type="number"
                            className="common-input border"
                            id="prix"
                            value={prix}
                            onChange={(e) => setPrix(e.target.value)}
                            placeholder="remplir votre prix/h ..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card common-card border border-gray-five overflow-hidden mb-24"
                    id="socialNetwork"
                  >
                    <div className="card-header">
                      <h6 className="title">Parametres des reseaux sociaux</h6>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-sm-6 col-xs-6">
                          <label htmlFor="facebookUrl" className="form-label">
                            Url de Facebook
                          </label>
                          <div className="position-relative">
                            <input
                              type="url"
                              className="common-input common-input--md common-input--withLeftIcon"
                              id="facebookUrl"
                              placeholder="Facebook Url"
                              value={facebookUrl}
                              onChange={(e) => setFacebookUrl(e.target.value)}
                            />
                            <span className="input-icon input-icon--left text-main">
                              <i className="fab fa-facebook-f" />{" "}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6 col-xs-6">
                          <label htmlFor="linkedinUrl" className="form-label">
                            Url de Linkedin
                          </label>
                          <div className="position-relative">
                            <input
                              type="url"
                              className="common-input common-input--md common-input--withLeftIcon"
                              id="linkedinUrl"
                              placeholder="Linkedin Url"
                              value={linkedinUrl}
                              onChange={(e) => setLinkedinUrl(e.target.value)}
                            />
                            <span className="input-icon input-icon--left text-main">
                              <i className="fab fa-linkedin-in" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {message && (
                    <div className="alert alert-success">{message}</div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}

                  <button
                    type="submit"
                    className="btn w-100 btn-main btn-md"
                    disabled={loading}
                  >
                    {loading
                      ? "Enregistrement..."
                      : "Enregistrer les informations"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSetting;