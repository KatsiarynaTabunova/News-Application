import { useEffect, useState } from 'react';
import NewsItem from './components/NewsItem.js';
import SearchForm from './components/SearchForm.js';
import Loading from './components/Loading.js';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [requestText, setRequestText] = useState('school-bus');
  const [isLoading, setIsloading] = useState(true);
  const [requestData, setRequestData] = useState('2022-09-30');
  const [requestSort, setRequestSort] = useState('Popularity');
  const [currentPage, setCurrentPage] = useState('1');
  const [fetching, setFetching] = useState('true');

  useEffect(() => {
    if (fetching) {
      if (currentPage > 5) {
        return;
      }
      const url = `https://newsapi.org/v2/everything?q=${requestText}&from=${requestData}&sortBy=${requestSort}&apiKey=79ff21b6d74340a99ab48c47e88e1aa1&pageSize=5&page=${currentPage}`;

      fetch(url)
        .then((response) => response.json())
        .then((newsObject) => {
          if (newsObject === null) {
            return;
          }
          setNews((prev) => {
            console.log(prev);
            return [...prev, ...newsObject.articles];
          });

          setCurrentPage((prevState) => +prevState + 1);
        })
        .catch((error) => setError(error.message))
        .finally(() => {
          setIsloading(false);
          setFetching(false);
        });
    }
  }, [fetching, currentPage]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.body.offsetHeight - (window.pageYOffset + window.innerHeight) <
      100
      //   &&
      // news !== null &&
      // news.articles.length < 50
    )
      setFetching(true);
  };

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
        setRequestSort={(typeOfSort) => {
          setIsloading(true);
          setRequestSort(typeOfSort);
        }}
        submit={() => {
          setFetching(true);
        }}
      />

      {isLoading ? (
        <Loading />
      ) : (
        news != null &&
        news.map((newsItem, index) => (
          <NewsItem key={index * currentPage} {...newsItem} />
        ))
      )}
      {/* {news !== null && news.length === 0 && <h2>We can't find news...</h2>} */}
    </div>
  );
}

export default App;
