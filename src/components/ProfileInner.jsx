import { useState, useEffect } from "react";
import React from "react";


const ProfileInner = () => {
  // Get token from localStorage
  const token = localStorage.getItem('auth_token');
  
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    image: '',
    membre_depuis: ''
  });

  const [profileForm, setProfileForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  });

  // State for password change form
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setProfileForm({
        nom: userData.nom || '',
        prenom: userData.prenom || '',
        email: userData.email || '',
        telephone: userData.telephone || ''
      });
      
      if (userData.image) {
        setImagePreview(userData.image);
      }
    }
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/prestataire/information', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid - redirect to login
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          return;
        }
        throw new Error(data.message || 'Failed to fetch user data');
      }

      const responseData = {
        nom: data.nom || '',
        prenom: data.prenom || data['prenom '] || '', 
        email: data.email || '',
        telephone: data.telephone || '',
        image: data.image || '',
        membre_depuis: data.membre_depuis || ''
      };

      console.log('Fetched user data:', responseData); // Debug log
      setUserData(responseData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('nom', profileForm.nom);
      formData.append('prenom', profileForm.prenom);
      formData.append('email', profileForm.email);
      formData.append('telephone', profileForm.telephone);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch('http://localhost:8000/api/prestataire/profile/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || 'Une erreur est survenue' });
        }
        return;
      }

      setUserData(data.prestataire || data);
      setSuccessMessage('Profil mis à jour avec succès!');
      
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ general: 'Erreur de connexion au serveur' });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setErrors({});
    setSuccessMessage('');

    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      setErrors({ new_password_confirmation: 'Les mots de passe ne correspondent pas' });
      setPasswordLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/prestataire/password/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password,
          new_password_confirmation: passwordForm.new_password_confirmation
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || 'Une erreur est survenue' });
        }
        return;
      }

      setSuccessMessage('Mot de passe changé avec succès!');
      
      setPasswordForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
      
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error('Error updating password:', error);
      setErrors({ general: 'Erreur de connexion au serveur' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return dateString;
  };

  if (loading) {
    return (
      <div className="dashboard-body__content profile-content-wrapper z-index-1 position-relative mt--100">
        <div className="text-center py-5">
          <div className="spinner-border text-main" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Cover Photo Start - Fixed background image */}
      <div 
        className="cover-photo position-relative z-index-1 overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/images/thumbs/cover-photo.jpg)', // Change this path to your cover photo
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '200px'
        }}
      >
      </div>


      <div className="dashboard-body__content profile-content-wrapper z-index-1 position-relative mt--100">
        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
            {successMessage}
            <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
          </div>
        )}

        
        {errors.general && (
          <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
            {errors.general}
            <button type="button" className="btn-close" onClick={() => setErrors(prev => ({ ...prev, general: '' }))}></button>
          </div>
        )}

        <div className="profile">
          <div className="row gy-4">
            <div className="col-xxl-3 col-xl-4">
              <div className="profile-info">
                <div className="profile-info__inner mb-40 text-center">
                  <div className="avatar-upload mb-24">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="imageUpload">
                        <img src="/assets/images/icons/camera.svg" alt="" />
                      </label>
                    </div>
                    <div className="avatar-preview">
                      <div 
                        id="imagePreview"
                        style={{
                          backgroundImage: imagePreview 
                            ? `url(${imagePreview})` 
                            : userData.image 
                              ? `url(${userData.image})`
                              : 'url(/assets/images/thumbs/default-avatar.png)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          width: '116px',
                          height: '116px',
                          borderRadius: '50%',
                          margin: '0 auto'
                        }}
                      ></div>
                    </div>
                  </div>
                  <h5 className="profile-info__name mb-1">
                    {userData.prenom || ''} {userData.nom || ''}
                  </h5>
                </div>
                <ul className="profile-info-list">
                  <li className="profile-info-list__item">
                    <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                      <img
                        src="/assets/images/icons/profile-info-icon1.svg"
                        alt=""
                        className="icon"
                      />
                      <span className="text text-heading fw-500">Nom</span>
                    </span>
                    <span className="profile-info-list__info">{userData.nom || 'N/A'}</span>
                  </li>
                  <li className="profile-info-list__item">
                    <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                      <img
                        src="/assets/images/icons/profile-info-icon2.svg"
                        alt=""
                        className="icon"
                      />
                      <span className="text text-heading fw-500">Email</span>
                    </span>
                    <span 
                      className="profile-info-list__info" 
                      style={{ 
                        wordBreak: 'keep-all',
                        overflowWrap: 'normal',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '200px'
                      }}
                      title={userData.email || 'N/A'}
                    >
                      {userData.email || 'N/A'}
                    </span>
                  </li>
                  <li className="profile-info-list__item">
                    <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                      <img
                        src="/assets/images/icons/profile-info-icon3.svg"
                        alt=""
                        className="icon"
                      />
                      <span className="text text-heading fw-500">Télé</span>
                    </span>
                    <span className="profile-info-list__info">{userData.telephone || 'N/A'}</span>
                  </li>
                  <li className="profile-info-list__item">
                    <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                      <img
                        src="/assets/images/icons/profile-info-icon6.svg"
                        alt=""
                        className="icon"
                      />
                      <span className="text text-heading fw-500">Depuis</span>
                    </span>
                    <span className="profile-info-list__info">
                      {formatDate(userData.membre_depuis)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xxl-9 col-xl-8">
              <div className="dashboard-card">
                <div className="dashboard-card__header pb-0">
                  <ul
                    className="nav tab-bordered nav-pills"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link font-18 font-heading active"
                        id="pills-personalInfo-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-personalInfo"
                        type="button"
                        role="tab"
                        aria-controls="pills-personalInfo"
                        aria-selected="true"
                      >
                        Informations personnelles
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link font-18 font-heading"
                        id="pills-changePassword-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-changePassword"
                        type="button"
                        role="tab"
                        aria-controls="pills-changePassword"
                        aria-selected="false"
                      >
                        Changer le mot de passe
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="profile-info-content">
                  <div className="tab-content" id="pills-tabContent">
                    {/* Personal Info Tab */}
                    <div
                      className="tab-pane fade show active"
                      id="pills-personalInfo"
                      role="tabpanel"
                      aria-labelledby="pills-personalInfo-tab"
                      tabIndex={0}
                    >
                      <div onSubmit={handleProfileUpdate}>
                        <div className="row gy-4">
                          <div className="col-sm-6 col-xs-6">
                            <label
                              htmlFor="nom"
                              className="form-label mb-2 font-18 font-heading fw-600"
                            >
                              Nom
                            </label>
                            <input
                              type="text"
                              className={`common-input border ${errors.nom ? 'is-invalid' : ''}`}
                              id="nom"
                              name="nom"
                              value={profileForm.nom}
                              onChange={handleProfileChange}
                              placeholder="votre nom ..."
                            />
                            {errors.nom && <small className="text-danger">{errors.nom}</small>}
                          </div>

                          <div className="col-sm-6 col-xs-6">
                            <label
                              htmlFor="prenom"
                              className="form-label mb-2 font-18 font-heading fw-600"
                            >
                              Prénom
                            </label>
                            <input
                              type="text"
                              className={`common-input border ${errors.prenom ? 'is-invalid' : ''}`}
                              id="prenom"
                              name="prenom"
                              value={profileForm.prenom}
                              onChange={handleProfileChange}
                              placeholder="votre prénom ..."
                            />
                            {errors.prenom && <small className="text-danger">{errors.prenom}</small>}
                          </div>

                          <div className="col-sm-6 col-xs-6">
                            <label
                              htmlFor="telephone"
                              className="form-label mb-2 font-18 font-heading fw-600"
                            >
                              Numéro de téléphone
                            </label>
                            <input
                              type="tel"
                              className={`common-input border ${errors.telephone ? 'is-invalid' : ''}`}
                              id="telephone"
                              name="telephone"
                              value={profileForm.telephone}
                              onChange={handleProfileChange}
                              placeholder="Numéro de téléphone"
                            />
                            {errors.telephone && <small className="text-danger">{errors.telephone}</small>}
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
                              className={`common-input border ${errors.email ? 'is-invalid' : ''}`}
                              id="email"
                              name="email"
                              value={profileForm.email}
                              onChange={handleProfileChange}
                              placeholder="Email"
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                          </div>

                          <div className="col-sm-12 text-end">
                            <button 
                              className="btn btn-main btn-lg pill mt-4"
                              onClick={handleProfileUpdate}
                              disabled={updateLoading}
                            >
                              {updateLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Change Password Tab */}
                    <div
                      className="tab-pane fade"
                      id="pills-changePassword"
                      role="tabpanel"
                      aria-labelledby="pills-changePassword-tab"
                      tabIndex={0}
                    >
                      <div onSubmit={handlePasswordUpdate}>
                        <div className="row gy-4">
                          <div className="col-12">
                            <label
                              htmlFor="current-password"
                              className="form-label mb-2 font-18 font-heading fw-600"
                            >
                              Mot de passe actuel
                            </label>
                            <div className="position-relative">
                              <input
                                type={showCurrentPassword ? "text" : "password"}
                                className={`common-input common-input--withIcon common-input--withLeftIcon ${errors.current_password ? 'is-invalid' : ''}`}
                                id="current-password"
                                name="current_password"
                                value={passwordForm.current_password}
                                onChange={handlePasswordChange}
                                placeholder="************"
                              />
                              <span className="input-icon input-icon--left">
                                <img
                                  src="/assets/images/icons/key-icon.svg"
                                  alt=""
                                />
                              </span>
                              <span
                                className="input-icon password-show-hide fas fa-eye la-eye-slash"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                style={{ cursor: 'pointer' }}
                              />
                            </div>
                            {errors.current_password && <small className="text-danger">{errors.current_password}</small>}
                          </div>

                          <div className="col-sm-6 col-xs-6">
                            <label
                              htmlFor="new-password"
                              className="form-label mb-2 font-18 font-heading fw-600"
                            >
                              Nouveau Mot de passe
                            </label>
                            <div className="position-relative">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                className={`common-input common-input--withIcon common-input--withLeftIcon ${errors.new_password ? 'is-invalid' : ''}`}
                                id="new-password"
                                name="new_password"
                                value={passwordForm.new_password}
                                onChange={handlePasswordChange}
                                placeholder="************"
                              />
                              <span className="input-icon input-icon--left">
                                <img
                                  src="/assets/images/icons/lock-two.svg"
                                  alt=""
                                />
                              </span>
                              <span
                                className="input-icon password-show-hide fas fa-eye la-eye-slash"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                style={{ cursor: 'pointer' }}
                              />
                            </div>
                            {errors.new_password && <small className="text-danger">{errors.new_password}</small>}
                          </div>

                          <div className="col-sm-6 col-xs-6">
                            <label
                              htmlFor="confirm-password"
                              className="form-label mb-2 font-18 font-heading fw-600"
                            >
                              Confirmer le Mot de passe
                            </label>
                            <div className="position-relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`common-input common-input--withIcon common-input--withLeftIcon ${errors.new_password_confirmation ? 'is-invalid' : ''}`}
                                id="confirm-password"
                                name="new_password_confirmation"
                                value={passwordForm.new_password_confirmation}
                                onChange={handlePasswordChange}
                                placeholder="************"
                              />
                              <span className="input-icon input-icon--left">
                                <img
                                  src="/assets/images/icons/lock-two.svg"
                                  alt=""
                                />
                              </span>
                              <span
                                className="input-icon password-show-hide fas fa-eye la-eye-slash"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ cursor: 'pointer' }}
                              />
                            </div>
                            {errors.new_password_confirmation && <small className="text-danger">{errors.new_password_confirmation}</small>}
                          </div>

                          <div className="col-sm-12 text-end">
                            <button 
                              className="btn btn-main btn-lg pill mt-4"
                              onClick={handlePasswordUpdate}
                              disabled={passwordLoading}
                            >
                              {passwordLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default ProfileInner;