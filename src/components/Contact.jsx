import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="contact padding-t-120 padding-b-60 section-bg position-relative z-index-1 overflow-hidden">
      <img
        src="/assets/images/gradients/contact-back.png"
        alt=""
        className="bg--gradient"
      />
      <img
        src="/assets/images/shapes/pattern-five.png"
        className="position-absolute end-0 top-0 z-index--1"
        alt=""
      />
      <div className="container container-two">
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="contact-info">
              <h3 className="contact-info__title">N’hésitez pas à nous contacter</h3>
              <p className="contact-info__desc">
              Nous sommes là pour répondre à toutes vos questions et vous aider à profiter pleinement de nos services.
              </p>
              <div className="contact-info__item-wrapper flx-between gap-4">
                <div className="contact-info__item">
                  <span className="contact-info__text text-capitalize d-block mb-1">
                  Appelez-nous
                  </span>
                  <Link
                    to="tel:0632262044"
                    className="contact-info__link font-24 fw-500 text-heading hover-text-main"
                  >
                    +212 632262044
                  </Link>
                </div>
                <div className="contact-info__item">
                  <span className="contact-info__text text-capitalize d-block mb-1">
                  Envoyez-nous un courriel
                  </span>
                  <Link
                    to="support@servini.ma"
                    className="contact-info__link font-24 fw-500 text-heading hover-text-main"
                  >
                   support@servini.ma
                  </Link>
                </div>
              </div>
              <div className="mt-24">
                <ul className="social-icon-list">
                  <li className="social-icon-list__item">
                    <Link
                      to="https://www.facebook.com"
                      className="social-icon-list__link text-heading flx-center"
                    >
                      <i className="fab fa-facebook-f" />
                    </Link>
                  </li>
                  <li className="social-icon-list__item">
                    <Link
                      to="https://www.twitter.com"
                      className="social-icon-list__link text-heading flx-center"
                    >
                      {" "}
                      <i className="fab fa-twitter" />
                    </Link>
                  </li>
                  <li className="social-icon-list__item">
                    <Link
                      to="https://www.linkedin.com"
                      className="social-icon-list__link text-heading flx-center"
                    >
                      {" "}
                      <i className="fab fa-linkedin-in" />
                    </Link>
                  </li>
                  <li className="social-icon-list__item">
                    <Link
                      to="https://www.pinterest.com"
                      className="social-icon-list__link text-heading flx-center"
                    >
                      {" "}
                      <i className="fab fa-pinterest-p" />
                    </Link>
                  </li>
                  <li className="social-icon-list__item">
                    <Link
                      to="https://www.pinterest.com"
                      className="social-icon-list__link text-heading flx-center"
                    >
                      {" "}
                      <i className="fab fa-youtube" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-7 ps-lg-5">
            <div className="card common-card p-sm-4">
              <div className="card-body">
                <form action="#" autoComplete="off">
                  <div className="row gy-4">
                    <div className="col-sm-6 col-xs-6">
                      <label
                        htmlFor="name"
                        className="form-label mb-2 font-18 font-heading fw-600"
                      >
                        Nom complet
                      </label>
                      <input
                        type="text"
                        className="common-input common-input--grayBg border"
                        id="name"
                        placeholder="Votre nom complet ici"
                      />
                    </div>
                    <div className="col-sm-6 col-xs-6">
                      <label
                        htmlFor="email"
                        className="form-label mb-2 font-18 font-heading fw-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="common-input common-input--grayBg border"
                        id="email"
                        placeholder="Votre email ici "
                      />
                    </div>
                    <div className="col-sm-6 col-xs-6">
                      <label
                        htmlFor="phone"
                        className="form-label mb-2 font-18 font-heading fw-600"
                      >
                         Numéro de téléphone
                      </label>
                      <input
                        type="phone"
                        className="common-input common-input--grayBg border"
                        id="phone"
                        placeholder="Votre numéro de téléphone ici "
                      />
                    </div>
                    <div className="col-sm-6 col-xs-6">
                      <label
                        htmlFor="sujet"
                        className="form-label mb-2 font-18 font-heading fw-600"
                      >
                         Sujet
                      </label>
                      <input
                        type="text"
                        className="common-input common-input--grayBg border"
                        id="sujet"
                        placeholder="Votre sujet ici"
                      />
                    </div>
                    <div className="col-sm-12">
                      <label
                        htmlFor="message"
                        className="form-label mb-2 font-18 font-heading fw-600"
                      >
                        Message
                      </label>
                      <textarea
                        className="common-input common-input--grayBg border"
                        id="message"
                        placeholder="Ecrire votre message ici"
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-sm-12">
                      <button className="btn btn-main btn-lg pill w-100">
                        {" "}
                         Envoyer{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Contact;