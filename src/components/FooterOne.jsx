import { Link } from "react-router-dom";

const FooterOne = () => {
  return (
    <>
      <footer className="footer-section">
        <img
          src="/assets/images/shapes/pattern.png"
          alt=""
          className="bg-pattern"
        />
       
        <img
          src="/assets/images/gradients/footer-gradient.png"
          alt=""
          className="bg--gradient"
        />
        <div className="container container-two">
          <div className="row gy-5">
            <div className="col-xl-3 col-sm-6">
              <div className="footer-widget">
                <div className="footer-widget__logo">
                  <Link to="/">
                    <img src="/assets/images/logo/logo-homev2.svg" alt="" />
                  </Link>
                </div>
                <p className="footer-widget__desc">
                Quel que soit votre besoin — Servini vous connecte avec des professionnels fiables et notés par la communauté.
                </p>
                <div className="footer-widget__social">
                  <ul className="social-icon-list">
                    <li className="social-icon-list__item">
                      <Link
                        to="https://www.facebook.com"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li className="social-icon-list__item">
                      <Link
                        to="https://www.twitter.com"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                    <li className="social-icon-list__item">
                      <Link
                        to="https://www.linkedin.com"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-linkedin-in" />
                      </Link>
                    </li>
                    <li className="social-icon-list__item">
                      <Link
                        to="https://www.pinterest.com"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-pinterest-p" />
                      </Link>
                    </li>
                    <li className="social-icon-list__item">
                      <Link
                        to="https://www.pinterest.com"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-youtube" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-sm-6 col-xs-6">
              <div className="footer-widget">
                <h5 className="footer-widget__title text-white">Navigation</h5>
                <ul className="footer-lists">
                  <li className="footer-lists__item">
                    <Link to="/" className="footer-lists__link">
                      Accueil
                    </Link>
                  </li>
                  <li className="footer-lists__item">
                    <Link
                      to="/all-providers"
                      className="footer-lists__link"
                    >
                      Prestataires
                    </Link>
                  </li>
                  <li className="footer-lists__item">
                    <Link to="/contact" className="footer-lists__link">
                      Contact
                    </Link>
                  </li>
                  <li className="footer-lists__item">
                    <Link to="/apropos" className="footer-lists__link">
                    À Propos
                    </Link>
                  </li>
                 
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-xs-6 ps-xl-5">
              <div className="footer-widget">
                <h5 className="footer-widget__title text-white">Contact</h5>
                <ul className="footer-lists">
                <li className="footer-lists__item">
    {/* Use <a> with mailto: for email links */}
    <a href="mailto:support@servini.ma" className="footer-lists__link footer-lists__link2" >
        Email : support@servini.ma
    </a>
</li>
<li className="footer-lists__item">
    {/* Use <a> with tel: for phone numbers */}
    <a href="tel:+212632262044" className="footer-lists__link footer-lists__link2 ">
        Télé : 0632262044
    </a>
</li>
                 
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6">
              <div className="footer-widget">
                <h5 className="footer-widget__title text-white">Support disponible 24h/7j</h5>
                <p className="footer-widget__desc">
                Vous avez une question ? Notre équipe est là pour vous aider à tout moment.
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* bottom Footer */}
      <div className="bottom-footer">
        <div className="container container-two">
          <div className="bottom-footer__inner flx-between gap-3">
            <p className="bottom-footer__text font-14">
              Copyright © 2025 Servini, Tous droits réservés.
            </p>
            <div className="footer-links">
              <Link to="#" className="footer-link font-14">
              Conditions d'utilisation              </Link>
              <Link to="#" className="footer-link font-14">
              politique de confidentialité              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterOne;
