import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // 1. Import useNavigate

const MasterLayoutv2 = ({ children }) => {
    const navigate = useNavigate(); // 2. Initialisation du hook

    let [active, setActive] = useState(false)
    let [show, setShow] = useState(false)
    
    let dashboardControl = () => {
        setActive(!active)
    }

    // 3. Fonction de Déconnexion Admin
    const handleLogout = async () => {
        const token = localStorage.getItem("auth_token");

        // Appel API pour invalider le token côté serveur
        try {
            await fetch("http://localhost:8000/api/admin/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });
        } catch (error) {
            console.error("Erreur logout:", error);
        }

        // Nettoyage complet du navigateur
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_info");
        localStorage.removeItem("prestataire");

        // Redirection vers la page de connexion
        navigate("/login", { replace: true });
    };

    return (
        <>
            <section className={`dashboard ${active && "active"}`} onClick={() => show === true && setShow(false)}>
                <div className="dashboard__inner d-flex">
                    {/* Dashboard Sidebar Start */}
                    <div className={`dashboard-sidebar ${active && "active"}`}>
                        <button
                            type="button"
                            className="dashboard-sidebar__close d-lg-none d-flex text-body hover-text-main" onClick={dashboardControl}
                        >
                            <i className="las la-times" />
                        </button>
                        <div className="dashboard-sidebar__inner">
                            <Link to="/" className="logo mb-48">
                                <img
                                    src="assets/images/logo/logo-homev1.png"
                                    alt=""
                                    className="white-version"
                                />
                                <img
                                    src="assets/images/logo/logo-homev2.svg"
                                    alt=""
                                    className="dark-version"
                                />
                            </Link>
                            <Link to="/" className="logo favicon mb-48">
                                <img src="assets/images/logo/favicon1.png" alt="" />
                            </Link>
                            
                            {/* Sidebar List Start */}
                            <ul className="sidebar-list">
                                <li className="sidebar-list__item">
                                    <NavLink to="/dashboard-admin" className={(navData) =>
                                        navData.isActive ? "sidebar-list__link activePage" : "sidebar-list__link"
                                    }  >
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon1.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active1.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">Tableau de bord</span>
                                    </NavLink>
                                </li>
                                
                                <li className="sidebar-list__item">
                                    <NavLink to="/liste-prestataires" className={(navData) =>
                                        navData.isActive ? "sidebar-list__link activePage" : "sidebar-list__link"
                                    }>
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon12.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active12.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">Prestataires</span>
                                    </NavLink>
                                </li>

                                {/* 4. BOUTON SE DÉCONNECTER (Espace supprimé) */}
                                <li className="sidebar-list__item"> 
                                {/* J'ai retiré 'mt-5' ici pour supprimer l'espace */}
                                    <div 
                                        onClick={handleLogout} 
                                        className="sidebar-list__link" 
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon13.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active13.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">Se déconnecter</span>
                                    </div>
                                </li>
                                
                            </ul>
                            {/* Sidebar List End */}
                        </div>
                    </div>

                    <div className="dashboard-body">
                        {/* Dashboard Nav Start */}
                        <div className="dashboard-nav bg-white flx-between gap-md-3 gap-2">
                            <div className="dashboard-nav__left flx-align gap-md-3 gap-2">
                                <button onClick={dashboardControl}
                                    type="button"
                                    className="icon-btn bar-icon text-heading bg-gray-seven flx-center"
                                >
                                    <i className="las la-bars" />
                                </button>
                                <button onClick={dashboardControl}
                                    type="button"
                                    className="icon-btn arrow-icon text-heading bg-gray-seven flx-center"
                                >
                                    <img src="assets/images/icons/angle-right.svg" alt="" />
                                </button>
                                
                            </div>
                           
                        </div>

                        {/* children */}
                        {children}
                        
                        {/* Dashboard Footer */}
                        <div className="dashboard-footer bottom-footer-two mt-32 border-0 bg-white">
                            <div className="bottom-footer__inner text-center">
                                <p className="bottom-footer__text font-14">
                                    Copyright © 2025 Servini, All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MasterLayoutv2;