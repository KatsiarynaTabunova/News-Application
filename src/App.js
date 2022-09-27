import { useEffect, useState } from 'react';
import NewsItem from './components/NewsItem.js';
import SearchForm from './components/SearchForm.js';
import Loading from './components/Loading.js';
import './App.css';

function App() {
  const [news, setNews] = useState(null);
  const [error, setError] = useState('');
  const [requestText, setRequestText] = useState('school-bus');
  const [isLoading, setIsloading] = useState(true);
  const [requestData, setRequestData] = useState('2022-09-26');

  useEffect(() => {
    const url = `https://newsapi.org/v2/everything?q=${requestText}&from=${requestData}&sortBy=publishedAt&apiKey=6e34452f4a44425c9a9756b6a1a231f2&pageSize=10&page=1`;
    fetch(url)
      .then((response) => response.json())
      .then((object) => {
        console.log(object);
        setNews(object);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsloading(false));
  }, [requestText, requestData]);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="App">
      <SearchForm
        setRequestText={(text) => {
          setIsloading(true);
          setRequestText(text);
        }}
        setRequestData={(data) => {
          setIsloading(true);
          setRequestData(data);
        }}
      />

      {isLoading ? (
        <Loading />
      ) : (
        news != null &&
        news.articles.map((newsItem, index) => (
          <NewsItem key={index} {...newsItem} />
        ))
      )}
      {news !== null && news.articles.length === 0 && (
        <h2>We can't find news...</h2>
      )}
    </div>
  );
}

export default App;
