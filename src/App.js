import { useEffect, useState } from 'react';
import NewsItem from './components/NewsItem.js';
import SearchForm from './components/SearchForm.js';
import './App.css';

function App() {
  const [news, setNews] = useState(null);
  const [error, setError] = useState('');
  const [requestText, setRequestText] = useState('school-bus');

  useEffect(() => {
    const url = `https://newsapi.org/v2/everything?q=${requestText}&from=2022-08-25&sortBy=publishedAt&apiKey=6e34452f4a44425c9a9756b6a1a231f2&pageSize=10&page=1`;
    fetch(url)
      .then((response) => response.json())
      .then((object) => {
        console.log(object);
        setNews(object);
      })
      .catch((error) => setError(error.message));
  }, [requestText]);

  if (error) {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div className="App">
      <SearchForm setRequestText={(text) => setRequestText(text)} />
      {news !== null ? (
        news.articles.map((newsItem, index) => (
          <NewsItem key={index} {...newsItem} />
        ))
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default App;
