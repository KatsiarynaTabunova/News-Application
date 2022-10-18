import { useEffect, useState } from 'react';
import NewsItem from './components/NewsItem.js';
import SearchForm from './components/SearchForm.js';
import Loading from './components/Loading.js';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [requestText, setRequestText] = useState('');
  const [isLoading, setIsloading] = useState(true);
  const [requestData, setRequestData] = useState('2022-09-30');
  const [requestSort, setRequestSort] = useState('Popularity');
  const [currentPage, setCurrentPage] = useState('1');
  const [fetching, setFetching] = useState(false);
  const [totalAmount, setTotalAmount] = useState('0');
  const [isPagination, setIsPagination] = useState(false);
  const [showInputError, setShowInputError] = useState(false);

  useEffect(() => {
    if (fetching) {
      const url = `https://newsapi.org/v2/everything?q=${requestText}&from=${requestData}&sortBy=${requestSort}&apiKey=79ff21b6d74340a99ab48c47e88e1aa1&pageSize=2&page=${currentPage}`;

      fetch(url)
        .then((response) => response.json())
        .then((newsObject) => {
          if (newsObject === null) {
            return;
          }
          if (isPagination) {
            setNews((prev) => {
              return [...prev, ...newsObject.articles];
            });
          } else {
            setNews(newsObject.articles);
          }
          setTotalAmount(newsObject.totalResults);
          setCurrentPage((prevState) => +prevState + 1);
        })
        .catch((error) => setError(error.message))
        .finally(() => {
          document.addEventListener('scroll', scrollHandler);
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
  }, [currentPage]);

  const scrollHandler = (e) => {
    if (
      e.target.body.offsetHeight - (window.pageYOffset + window.innerHeight) <
      100
    ) {
      if (!fetching && news.length < totalAmount) {
        document.removeEventListener('scroll', scrollHandler);
        setIsPagination(true);
        setFetching(true);
      }
    }
  };

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="App">
      <SearchForm
        setRequestText={(text) => {
          console.log('setRequestText=' + text);
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
        submit={(event) => {
          if (requestText === '') {
            setShowInputError(true);
            alert('Поле пустое');
          } else {
            setShowInputError(false);
            setIsPagination(false);
            setCurrentPage(1);
            setFetching(true);
          }
        }}
        showInputError={showInputError}
      />

      {isLoading ? (
        <Loading />
      ) : (
        news != null &&
        news.map((newsItem, index) => (
          <NewsItem key={index * currentPage} {...newsItem} />
        ))
      )}
      {news !== null && news.length === 0 && <h2>We can't find news...</h2>}
    </div>
  );
}

export default App;
