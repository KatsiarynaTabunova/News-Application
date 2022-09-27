import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ setRequestText, setRequestData }) {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();

    setRequestText(searchText);
    setRequestData(searchData);
  }

  return (
    <form className="header" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="enter information"
      />
      <input
        type="date"
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
        // placeholder="year-month-number"
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
