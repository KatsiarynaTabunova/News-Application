import { useState } from 'react';
import Dropdown from './Dropdown';
import './SearchForm.css';

function SearchForm({ setRequestText, setRequestData }) {
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [dropDownState, setDropDownState] = useState('Today');

  function handleDate(days) {
    const todayDate = new Date();
    const currentDate = new Date(todayDate);
    currentDate.setDate(currentDate.getDate() - days);
    return currentDate.toISOString().slice(0, 10);
  }

  const options = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Two weeks ago', value: 'two-weeks-ago' },
  ];
  const handleChange = (event) => {
    let dropDownValue = event.target.value;
    switch (dropDownValue) {
      case 'today':
        dropDownValue = handleDate(0);
        console.log('today');
        break;
      case 'yesterday':
        dropDownValue = handleDate(1);
        break;
      case 'two-weeks-ago':
        dropDownValue = handleDate(14);
        break;
      default:
        dropDownValue = handleDate(0);
    }
    setDropDownState(dropDownValue);
    setSearchDate(dropDownValue);
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    setRequestText(searchText);
    setRequestData(searchDate);
  }

  return (
    <form className="header" onSubmit={handleFormSubmit}>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="enter information"
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button type="submit">Search</button>
        <div>
          <Dropdown
            options={options}
            value={dropDownState}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
