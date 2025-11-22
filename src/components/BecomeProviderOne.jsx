import { Link } from "react-router-dom";

const BecomeProviderOne = () => {
  return (
    <section className="seller padding-y-120">
      <div className="container container-two">
        <div className="row gy-4">
          <div className="col-lg-12">
            <div className="seller-item position-relative z-index-1">
              <img
                src="/assets/images/shapes/seller-bg.png"
                className="position-absolute start-0 top-0 z-index--1"
                alt=""
              />
              <h3 className="seller-item__title">
              Gagnez de l’argent avec vos compétences !              </h3>
              <p className="seller-item__desc fw-500 text-heading">
              Rejoignez Servini et proposez vos services à des milliers de clients partout au Maroc. Travaillez selon vos disponibilités et développez votre activité facilement.
              </p>
              <Link
                to="/register"
                className="btn btn-static-outline-black btn-xl pill fw-600"
              >
Devenir prestataire              </Link>
            </div>
          </div>
          
         
        </div>
      </div>
    </section>
  );
};

export default BecomeProviderOne;
