import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  
  // Scroller en haut de la page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
     

      {/* --- 2. L'ÉQUIPE ET LE CONTEXTE (Modifié pour afficher les photos de l'équipe) --- */}
      <section className="about-story py-5">
        <div className="container">
          
          {/* Titre de la section */}
          <div className="row mb-5 text-center">
            <div className="col-12">
              <h6 className="text-main fw-bold text-uppercase" style={{ color: "#0f7e62" }}>Origine du Projet</h6>
              <h2 className="fw-bold">Une Solution Née au Centre d'Excellence</h2>
            </div>
          </div>

          {/* Photos des créateurs */}
          <div className="row g-4 mb-5 justify-content-center">
            {/* Rachid OUTSILA */}
            <div className="col-md-4 text-center">
              <img 
                src="/assets/images/thumbs/rachid.jpg" 
                alt="Rachid OUTSILA" 
                className="img-fluid rounded-circle shadow-lg mb-3"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                onError={(e) => e.target.src = "https://placehold.co/200x200?text=Rachid+OUTSILA"} 
              />
              <h4 className="fw-bold mt-2">Rachid OUTSILA</h4>
              <small className="text-main fw-bold" style={{ color: "#0f7e62" }}>FSA Agadir</small>
            </div>
            {/* Khalid ZADO */}
            <div className="col-md-4 text-center">
              <img 
                src="/assets/images/thumbs/khalid.jpg" 
                alt="Khalid ZADO" 
                className="img-fluid rounded-circle shadow-lg mb-3"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                onError={(e) => e.target.src = "https://placehold.co/200x200?text=Khalid+ZADO"} 
              />
              <h4 className="fw-bold mt-2">Khalid ZADO</h4>
           
              <small className="text-main fw-bold" style={{ color: "#0f7e62" }}>FSA Agadir</small>
            </div>
          </div>

          {/* Texte descriptif et statistiques */}
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className="text-secondary mb-4 lead">
                La plateforme <strong>SERVINI</strong> est le fruit de la collaboration entre <strong>Rachid OUTSILA</strong> et <strong>Khalid ZADO</strong>, étudiants au sein du <strong>Centre d'Excellence</strong> de la <strong>Faculté des Sciences d'Agadir</strong>.
              </p>
              <p className="text-secondary">
                Ce projet est né d'une volonté concrète de résoudre une problématique majeure de notre société : l'accès difficile aux services de proximité fiables. En alliant nos compétences techniques acquises à la faculté et une analyse approfondie du marché, nous avons créé une solution numérique robuste pour moderniser la mise en relation entre prestataires et clients.
              </p>
              
              <div className="row mt-5">
                <div className="col-6">
                  <h3 className="fw-bold" style={{ color: "#0f7e62" }}>FSA</h3>
                  <p className="small text-muted">Faculté des Sciences Agadir</p>
                </div>
                <div className="col-6">
                  <h3 className="fw-bold" style={{ color: "#0f7e62" }}>2025</h3>
                  <p className="small text-muted">Année de Réalisation</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- 3. NOS VALEURS (Cartes) --- */}
      <section className="about-values py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Nos Engagements</h2>
            <p className="text-muted">Les piliers de notre développement.</p>
          </div>

          <div className="row g-4">
            {/* Valeur 1 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center hover-up">
                <div className="mb-3">
                   <span style={{ fontSize: "3rem" }}>💻</span>
                </div>
                <h4 className="fw-bold">Innovation Technique</h4>
                <p className="text-secondary">
                  Une architecture moderne (React & Laravel) pour garantir performance et fluidité à nos utilisateurs.
                </p>
              </div>
            </div>

            {/* Valeur 2 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center hover-up">
                <div className="mb-3">
                   <span style={{ fontSize: "3rem" }}>🛡️</span>
                </div>
                <h4 className="fw-bold">Fiabilité</h4>
                <p className="text-secondary">
                  Un système de vérification rigoureux pour instaurer un climat de confiance entre les parties.
                </p>
              </div>
            </div>

            {/* Valeur 3 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center hover-up">
                <div className="mb-3">
                   <span style={{ fontSize: "3rem" }}>🤝</span>
                </div>
                <h4 className="fw-bold">Impact Social</h4>
                <p className="text-secondary">
                  Faciliter le quotidien des ménages tout en offrant des opportunités concrètes aux artisans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default AboutPage;