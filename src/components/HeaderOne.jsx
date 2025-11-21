
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
const HeaderOne = () => {
  const [active, setActive] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    var offCanvasNav = document.getElementById("offcanvas-navigation");
    var menuExpand = offCanvasNav.querySelectorAll(
      ".has-submenu > .nav-menu__link"
    );
    var numMenuExpand = menuExpand.length;

    function sideMenuExpand() {
      if (this.parentElement.classList.contains("active") === true) {
        this.parentElement.classList.remove("active");
      } else {
        for (let i = 0; i < numMenuExpand; i++) {
          menuExpand[i].parentElement.classList.remove("active");
        }
        this.parentElement.classList.add("active");
      }
    }

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", sideMenuExpand);
    }

  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mobileMenu = () => {
    setActive(!active);
  };

  return (
    <>
      <div className="overlay"></div>
      <div className={`side-overlay ${active && "show"}`}></div>
      <header className={`header ${scroll ? "fixed-header" : ""} `}>
        <div className="container container-full">
          <nav className="header-inner flx-between">
            <div className="logo">
              <Link to="/" className="link white-version" >
                <img src="/assets/images/logo/logo-homev1.png" alt="Logo" />
              </Link>
              
            </div>
            <div className="header-menu d-lg-block d-none">
              <ul className="nav-menu flx-align">
                <li className="nav-menu__item">
                  <Link to="/" className="nav-menu__link">
                  Accueil
                  </Link>  
                </li>
                <li className="nav-menu__item">
                  <Link to="/all-providers" className="nav-menu__link">
                    Prestataires
                  </Link>   
                </li>
                <li className="nav-menu__item">
                  <NavLink to="/contact" className="nav-menu__link">
                  Contact
                  </NavLink>
                </li>
                <li className="nav-menu__item">
                  <NavLink to="/contact" className="nav-menu__link">
                  À Propos
                  </NavLink>
                </li>
              </ul>
            </div>
          
            <div className="header-right flx-align">
      
            
              
              <div className="header-right__inner gap-3 flx-align d-lg-flex d-none mr-10">
                <Link to="/register" className="btn btn-main pill">
                  <span className="icon-left icon">
                    <img src="/assets/images/icons/user.svg" alt="" />
                  </span>
                  Devenir prestataire                
                  </Link>
      
              </div>
              <div className="header-right__inner gap-3 flx-align d-lg-flex d-none mr-10">
              <Link
                to="/check-reservation"
                className="btn pill btn-white-green"
              >
                <span className="icon-left icon">
                  <img src="/assets/images/icons/sidebar-icon-active12.svg" alt="" />
                </span>
                Gérer ma réservation
              </Link>
      
              </div>
              <button
                type="button"
                className="toggle-mobileMenu d-lg-none"
                onClick={mobileMenu}
              >
                <i className="las la-bars" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className={`mobile-menu d-lg-none d-block ${active && "active"}`}>
        <button type="button" className="close-button text-body hover-text-main" onClick={mobileMenu}>
          <i className="las la-times" />
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo">
            <img
              src="/assets/images/logo/logo-mb.png"
              alt="Logo"
              className="white-version"
            />
           
          </Link>
          <div className="mobile-menu__menu">
            <ul
              className="nav-menu flx-align nav-menu--mobile"
              id="offcanvas-navigation"
            >
               <li className="nav-menu__item">
                  <Link to="/" className="nav-menu__link">
                  Accueil
                  </Link>  
                </li>
                <li className="nav-menu__item">
                  <Link to="/all-providers" className="nav-menu__link">
                    Prestataires
                  </Link>   
                </li>
                <li className="nav-menu__item">
                  <NavLink to="/contact" className="nav-menu__link">
                  Contact
                  </NavLink>
                </li>
                <li className="nav-menu__item">
                  <NavLink to="/contact" className="nav-menu__link">
                  À Propos
                  </NavLink>
                </li>
            </ul>
            <div className="header-right__inner d-lg-none my-3 gap-1 d-flex flx-align">
            <Link
  to="/check-reservation"
  className="btn pill btn-white-green"
>

  Gérer ma réservation
</Link>

              
            </div>
            <div className="header-right__inner d-lg-none my-3 gap-1 d-flex flx-align">
              <Link to="/register" className="btn btn-main pill">
                <span className="icon-left icon">
                  <img src="/assets/images/icons/user.svg" alt="" />
                </span>
                Devenir prestataire                
                </Link>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderOne;
