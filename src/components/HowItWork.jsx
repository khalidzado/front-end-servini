import { Link } from "react-router-dom";

const HowItWork = () => {
  return (
    <section className="service padding-y-120 position-relative z-index-1 overflow-hidden">
      <img
        src="/assets/images/shapes/curve-pattern3.png"
        alt=""
        className="position-absolute end-0 top-0 z-index--1"
      />
     
      <div className="container container-two">
        <div className="section-heading style-left style-flex flx-between align-items-end gap-3">
          <div className="section-heading__inner w-lg">
            <h3 className="section-heading__title">Comment ça marche ?</h3>
            <p className="section-heading__desc">
            C’est simple, rapide et sécurisé — Trouvez Votre Prestataire, en 3 étapes.
            </p>
          </div>
          <Link to="/register" className="btn btn-main btn-lg pill">
          Commencez maintenant          </Link>
        </div>
        <div className="row gy-4">
          <div className="col-lg-4 col-sm-6 col-xs-6">
            <div className="service-item hover-bg-main">
              
              <span className="service-item__icon">
                <img src="/assets/images/icons/number1.svg" alt="" />
              </span>
              <h5 className="service-item__title my-3">
              Trouvez un service
              </h5>
              <p className="service-item__desc">
              Parcourez nos prestataires selon vos besoins.
              </p>
            
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-xs-6">
            <div className="service-item hover-bg-main">
            
              <span className="service-item__icon">
                <img src="/assets/images/icons/number2.svg" alt="" />
              </span>
              <h5 className="service-item__title my-3">
              Réservez en ligne
                            </h5>
              <p className="service-item__desc">
              Remplir votre formulaire et confirmez votre réservation.
              </p>
              
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-xs-6">
            <div className="service-item hover-bg-main">
             
              <span className="service-item__icon">
                <img src="/assets/images/icons/number3.svg" alt="" />
              </span>
              <h5 className="service-item__title my-3">
              Évaluez le prestataire
              </h5>
              <p className="service-item__desc">
              Donnez votre avis pour aider la communauté.              </p>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
