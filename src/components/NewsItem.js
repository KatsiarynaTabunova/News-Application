import './NewsItem.css';
function NewsItmem(props) {
  const { title, description, urlToImage, url } = { ...props };

  return (
    <div className="news">
      <img className="imageStyle" src={urlToImage} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={{ url }}>Click here</a>
    </div>
  );
}

export default NewsItmem;
