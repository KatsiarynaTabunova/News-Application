import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ setRequestText }) {
  const [searchText, setSearchText] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();

    setRequestText(searchText);
  }

  return (
    <form className="header" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="enter information"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
