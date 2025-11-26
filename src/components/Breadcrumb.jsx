const Breadcrumb = () => {
  return (
    <section className="breadcrumb breadcrumb-one padding-y-60 section-bg position-relative z-index-1 overflow-hidden">
      <img
        src="/assets/images/gradients/contact-bread.png"
        alt=""
        className="bg--gradient"
      />
      
      <div className="container container-two">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="breadcrumb-one-content">
              <h3 className="breadcrumb-one-content__title text-center mb-3 text-capitalize">
               Trouvez le prestataire idéal pour votre besoin
              </h3>
              <p className="breadcrumb-one-content__desc text-center text-black-three">
              Comparez, choisissez et réservez le professionnel qui correspond à vos attentes. Simple, rapide et fiable.
              </p>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
