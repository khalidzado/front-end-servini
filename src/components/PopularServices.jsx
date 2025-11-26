import { Link } from "react-router-dom";

const PopularServices = () => {
  return (
    <section className="featured-contributor padding-y-120 position-relative z-index-1 overflow-hidden">
      <img
        src="/assets/images/shapes/pattern-curve-3.png"
        alt=""
        className="position-absolute start-0 top-0 z-index--1"
      />
      <img
        src="/assets/images/shapes/ele-moon1.png"
        alt=""
        className="element two"
      />
      <img
        src="/assets/images/shapes/elem2.png"
        alt=""
        className="element one"
      />
      <div className="container container-two">
        <div className="row gy-4 align-items-center">
          <div className="col-xl-4 col-lg-5">
            <div className="section-content">
              <div className="section-heading style-left">
                <h3 className="section-heading__title">
                  Services Populaires
                </h3>
                <p className="section-heading__desc font-18 w-sm">
                Découvrez les services les plus demandés par nos clients.
                </p>
              </div>
              <Link
                to="/profile"
                className="btn btn-main btn-lg pill fw-300"
              >
                Toutes les services
              </Link>
            </div>
          </div>
          <div className="col-xl-2 d-xl-block d-none" />
          <div className="col-xl-6 col-lg-7">
            <div className="row gy-4">
              <div className="col-sm-6 col-xs-6">
                <div className="contributor-item">
                 
                  <div className="contributor-item__content">
                    <div className="contributor-info flx-align gap-2">
                      <div className="contributor-info__thumb">
                        <svg aria-hidden="true" fill="#0f7e62" height="28" viewBox="0 0 32 32" width="28" xmlns="http://www.w3.org/2000/svg" class="categoryFamilyElementChild mui-noyy90 TRIconBase-Root"><g id="Name=Tree, Size=32"><g id="Shape"><path clip-rule="evenodd" d="M8.38298 6.42553C8.38298 3.42911 10.8121 1 13.8085 1C16.2684 1 18.3219 2.6384 18.9882 4.8711C22.0018 5.22335 24.3404 7.78535 24.3404 10.8936C24.3404 11.4666 24.256 12.015 24.1051 12.5319C27.1137 12.8889 29.4468 15.4485 29.4468 18.5532C29.4468 21.9021 26.732 24.617 23.383 24.617H8.06383C4.71483 24.617 2 21.9021 2 18.5532C2 15.9724 3.61212 13.7731 5.88181 12.8974C5.84908 12.664 5.82979 12.4215 5.82979 12.1702C5.82979 10.0981 6.87758 8.29376 8.44923 7.2066C8.40813 6.95855 8.38298 6.69791 8.38298 6.42553ZM13.8085 2.91489C11.8696 2.91489 10.2979 4.48667 10.2979 6.42553C10.2979 6.73894 10.3564 7.05526 10.4561 7.39853C10.583 7.83573 10.3846 8.30189 9.98146 8.51341C8.64929 9.21238 7.74468 10.5833 7.74468 12.1702C7.74468 12.5377 7.81213 12.9053 7.92392 13.2985C7.99649 13.5537 7.9599 13.8276 7.82289 14.0548C7.68587 14.282 7.46072 14.4421 7.20114 14.497C5.32319 14.8943 3.91489 16.5598 3.91489 18.5532C3.91489 20.8445 5.77241 22.7021 8.06383 22.7021H23.383C25.6744 22.7021 27.5319 20.8445 27.5319 18.5532C27.5319 16.2618 25.6744 14.4043 23.383 14.4043H22.6747C22.332 14.4043 22.0155 14.2211 21.8447 13.9241C21.6739 13.627 21.6748 13.2613 21.8472 12.9652C22.2111 12.34 22.4255 11.6398 22.4255 10.8936C22.4255 8.61894 20.5951 6.77186 18.3268 6.74498C18.3006 6.74773 18.265 6.75056 18.2233 6.75101C17.7429 6.75623 17.333 6.40461 17.2651 5.92901C17.0212 4.22174 15.5699 2.91489 13.8085 2.91489ZM18.3865 6.73723C18.3893 6.73681 18.3873 6.73711 18.3843 6.73753L18.3865 6.73723Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M8.38329 29.0851H23.0641V31H8.38329V29.0851Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M16.6805 10.5745V31H14.7656V10.5745H16.6805Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M21.2262 16.9574L16.6807 21.503L15.3266 20.1489L19.8722 15.6034L21.2262 16.9574Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M11.8934 12.7311L16.439 17.2766L15.0849 18.6306L10.5394 14.0851L11.8934 12.7311Z" fill="#0f7e62" fill-rule="evenodd"></path></g></g></svg>                   
                      </div>
                      <div className="contributor-info__content">
                        <h6 className="contributor-info__name mb-1 text-white">
                          Jardinage
                        </h6>
                        <span className="contributor-info__text text-white font-14">
                          12558 Prestations
                        </span>
                      </div>
                    </div>
                    <div className="contributor-item__thumb">
                      <img
                        src="/assets/images/thumbs/PlomberieH.png"
                        alt=""
                        className="cover-img"
                      />
                      <Link to="/service-details" className="contributor-item__link">
                        <img src="/assets/images/icons/link-white.svg" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xs-6">
                <div className="contributor-item">
                 
                  <div className="contributor-item__content">
                    <div className="contributor-info flx-align gap-2">
                      <div className="contributor-info__thumb">
                        <svg aria-hidden="true" fill="#0f7e62" height="28" viewBox="0 0 32 32" width="28" xmlns="http://www.w3.org/2000/svg" class="categoryFamilyElementChild mui-noyy90 TRIconBase-Root"><g id="Name=Tree, Size=32"><g id="Shape"><path clip-rule="evenodd" d="M8.38298 6.42553C8.38298 3.42911 10.8121 1 13.8085 1C16.2684 1 18.3219 2.6384 18.9882 4.8711C22.0018 5.22335 24.3404 7.78535 24.3404 10.8936C24.3404 11.4666 24.256 12.015 24.1051 12.5319C27.1137 12.8889 29.4468 15.4485 29.4468 18.5532C29.4468 21.9021 26.732 24.617 23.383 24.617H8.06383C4.71483 24.617 2 21.9021 2 18.5532C2 15.9724 3.61212 13.7731 5.88181 12.8974C5.84908 12.664 5.82979 12.4215 5.82979 12.1702C5.82979 10.0981 6.87758 8.29376 8.44923 7.2066C8.40813 6.95855 8.38298 6.69791 8.38298 6.42553ZM13.8085 2.91489C11.8696 2.91489 10.2979 4.48667 10.2979 6.42553C10.2979 6.73894 10.3564 7.05526 10.4561 7.39853C10.583 7.83573 10.3846 8.30189 9.98146 8.51341C8.64929 9.21238 7.74468 10.5833 7.74468 12.1702C7.74468 12.5377 7.81213 12.9053 7.92392 13.2985C7.99649 13.5537 7.9599 13.8276 7.82289 14.0548C7.68587 14.282 7.46072 14.4421 7.20114 14.497C5.32319 14.8943 3.91489 16.5598 3.91489 18.5532C3.91489 20.8445 5.77241 22.7021 8.06383 22.7021H23.383C25.6744 22.7021 27.5319 20.8445 27.5319 18.5532C27.5319 16.2618 25.6744 14.4043 23.383 14.4043H22.6747C22.332 14.4043 22.0155 14.2211 21.8447 13.9241C21.6739 13.627 21.6748 13.2613 21.8472 12.9652C22.2111 12.34 22.4255 11.6398 22.4255 10.8936C22.4255 8.61894 20.5951 6.77186 18.3268 6.74498C18.3006 6.74773 18.265 6.75056 18.2233 6.75101C17.7429 6.75623 17.333 6.40461 17.2651 5.92901C17.0212 4.22174 15.5699 2.91489 13.8085 2.91489ZM18.3865 6.73723C18.3893 6.73681 18.3873 6.73711 18.3843 6.73753L18.3865 6.73723Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M8.38329 29.0851H23.0641V31H8.38329V29.0851Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M16.6805 10.5745V31H14.7656V10.5745H16.6805Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M21.2262 16.9574L16.6807 21.503L15.3266 20.1489L19.8722 15.6034L21.2262 16.9574Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M11.8934 12.7311L16.439 17.2766L15.0849 18.6306L10.5394 14.0851L11.8934 12.7311Z" fill="#0f7e62" fill-rule="evenodd"></path></g></g></svg>                   
                      </div>
                      <div className="contributor-info__content">
                        <h6 className="contributor-info__name mb-1 text-white">
                          Jardinage
                        </h6>
                        <span className="contributor-info__text text-white font-14">
                          12558 Prestations
                        </span>
                      </div>
                    </div>
                    <div className="contributor-item__thumb">
                      <img
                        src="/assets/images/thumbs/contributor1.png"
                        alt=""
                        className="cover-img"
                      />
                      <Link to="/service-details" className="contributor-item__link">
                        <img src="/assets/images/icons/link-white.svg" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xs-6">
                <div className="contributor-item">
                
                  <div className="contributor-item__content">
                    <div className="contributor-info flx-align gap-2">
                      <div className="contributor-info__thumb">
                        <svg aria-hidden="true" fill="#0f7e62" height="28" viewBox="0 0 32 32" width="28" xmlns="http://www.w3.org/2000/svg" class="categoryFamilyElementChild mui-noyy90 TRIconBase-Root"><g id="Name=Tree, Size=32"><g id="Shape"><path clip-rule="evenodd" d="M8.38298 6.42553C8.38298 3.42911 10.8121 1 13.8085 1C16.2684 1 18.3219 2.6384 18.9882 4.8711C22.0018 5.22335 24.3404 7.78535 24.3404 10.8936C24.3404 11.4666 24.256 12.015 24.1051 12.5319C27.1137 12.8889 29.4468 15.4485 29.4468 18.5532C29.4468 21.9021 26.732 24.617 23.383 24.617H8.06383C4.71483 24.617 2 21.9021 2 18.5532C2 15.9724 3.61212 13.7731 5.88181 12.8974C5.84908 12.664 5.82979 12.4215 5.82979 12.1702C5.82979 10.0981 6.87758 8.29376 8.44923 7.2066C8.40813 6.95855 8.38298 6.69791 8.38298 6.42553ZM13.8085 2.91489C11.8696 2.91489 10.2979 4.48667 10.2979 6.42553C10.2979 6.73894 10.3564 7.05526 10.4561 7.39853C10.583 7.83573 10.3846 8.30189 9.98146 8.51341C8.64929 9.21238 7.74468 10.5833 7.74468 12.1702C7.74468 12.5377 7.81213 12.9053 7.92392 13.2985C7.99649 13.5537 7.9599 13.8276 7.82289 14.0548C7.68587 14.282 7.46072 14.4421 7.20114 14.497C5.32319 14.8943 3.91489 16.5598 3.91489 18.5532C3.91489 20.8445 5.77241 22.7021 8.06383 22.7021H23.383C25.6744 22.7021 27.5319 20.8445 27.5319 18.5532C27.5319 16.2618 25.6744 14.4043 23.383 14.4043H22.6747C22.332 14.4043 22.0155 14.2211 21.8447 13.9241C21.6739 13.627 21.6748 13.2613 21.8472 12.9652C22.2111 12.34 22.4255 11.6398 22.4255 10.8936C22.4255 8.61894 20.5951 6.77186 18.3268 6.74498C18.3006 6.74773 18.265 6.75056 18.2233 6.75101C17.7429 6.75623 17.333 6.40461 17.2651 5.92901C17.0212 4.22174 15.5699 2.91489 13.8085 2.91489ZM18.3865 6.73723C18.3893 6.73681 18.3873 6.73711 18.3843 6.73753L18.3865 6.73723Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M8.38329 29.0851H23.0641V31H8.38329V29.0851Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M16.6805 10.5745V31H14.7656V10.5745H16.6805Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M21.2262 16.9574L16.6807 21.503L15.3266 20.1489L19.8722 15.6034L21.2262 16.9574Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M11.8934 12.7311L16.439 17.2766L15.0849 18.6306L10.5394 14.0851L11.8934 12.7311Z" fill="#0f7e62" fill-rule="evenodd"></path></g></g></svg>                   
                      </div>
                      <div className="contributor-info__content">
                        <h6 className="contributor-info__name mb-1 text-white">
                          Jardinage
                        </h6>
                        <span className="contributor-info__text text-white font-14">
                          12558 Prestations
                        </span>
                      </div>
                    </div>
                    <div className="contributor-item__thumb">
                      <img
                        src="/assets/images/thumbs/contributor1.png"
                        alt=""
                        className="cover-img"
                      />
                      <Link to="/service-details" className="contributor-item__link">
                        <img src="/assets/images/icons/link-white.svg" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xs-6">
                <div className="contributor-item">
                  
                  <div className="contributor-item__content">
                    <div className="contributor-info flx-align gap-2">
                      <div className="contributor-info__thumb">
                        <svg aria-hidden="true" fill="#0f7e62" height="28" viewBox="0 0 32 32" width="28" xmlns="http://www.w3.org/2000/svg" class="categoryFamilyElementChild mui-noyy90 TRIconBase-Root"><g id="Name=Tree, Size=32"><g id="Shape"><path clip-rule="evenodd" d="M8.38298 6.42553C8.38298 3.42911 10.8121 1 13.8085 1C16.2684 1 18.3219 2.6384 18.9882 4.8711C22.0018 5.22335 24.3404 7.78535 24.3404 10.8936C24.3404 11.4666 24.256 12.015 24.1051 12.5319C27.1137 12.8889 29.4468 15.4485 29.4468 18.5532C29.4468 21.9021 26.732 24.617 23.383 24.617H8.06383C4.71483 24.617 2 21.9021 2 18.5532C2 15.9724 3.61212 13.7731 5.88181 12.8974C5.84908 12.664 5.82979 12.4215 5.82979 12.1702C5.82979 10.0981 6.87758 8.29376 8.44923 7.2066C8.40813 6.95855 8.38298 6.69791 8.38298 6.42553ZM13.8085 2.91489C11.8696 2.91489 10.2979 4.48667 10.2979 6.42553C10.2979 6.73894 10.3564 7.05526 10.4561 7.39853C10.583 7.83573 10.3846 8.30189 9.98146 8.51341C8.64929 9.21238 7.74468 10.5833 7.74468 12.1702C7.74468 12.5377 7.81213 12.9053 7.92392 13.2985C7.99649 13.5537 7.9599 13.8276 7.82289 14.0548C7.68587 14.282 7.46072 14.4421 7.20114 14.497C5.32319 14.8943 3.91489 16.5598 3.91489 18.5532C3.91489 20.8445 5.77241 22.7021 8.06383 22.7021H23.383C25.6744 22.7021 27.5319 20.8445 27.5319 18.5532C27.5319 16.2618 25.6744 14.4043 23.383 14.4043H22.6747C22.332 14.4043 22.0155 14.2211 21.8447 13.9241C21.6739 13.627 21.6748 13.2613 21.8472 12.9652C22.2111 12.34 22.4255 11.6398 22.4255 10.8936C22.4255 8.61894 20.5951 6.77186 18.3268 6.74498C18.3006 6.74773 18.265 6.75056 18.2233 6.75101C17.7429 6.75623 17.333 6.40461 17.2651 5.92901C17.0212 4.22174 15.5699 2.91489 13.8085 2.91489ZM18.3865 6.73723C18.3893 6.73681 18.3873 6.73711 18.3843 6.73753L18.3865 6.73723Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M8.38329 29.0851H23.0641V31H8.38329V29.0851Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M16.6805 10.5745V31H14.7656V10.5745H16.6805Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M21.2262 16.9574L16.6807 21.503L15.3266 20.1489L19.8722 15.6034L21.2262 16.9574Z" fill="#0f7e62" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M11.8934 12.7311L16.439 17.2766L15.0849 18.6306L10.5394 14.0851L11.8934 12.7311Z" fill="#0f7e62" fill-rule="evenodd"></path></g></g></svg>                   
                      </div>
                      <div className="contributor-info__content">
                        <h6 className="contributor-info__name mb-1 text-white">
                          Jardinage
                        </h6>
                        <span className="contributor-info__text text-white font-14">
                          12558 Prestations
                        </span>
                      </div>
                    </div>
                    <div className="contributor-item__thumb">
                      <img
                        src="/assets/images/thumbs/contributor1.png"
                        alt=""
                        className="cover-img"
                      />
                      <Link to="/service-details" className="contributor-item__link">
                        <img src="/assets/images/icons/link-white.svg" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
