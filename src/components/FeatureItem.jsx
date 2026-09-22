function FeatureItem({ icon, title, description, altText }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={altText} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureItem;