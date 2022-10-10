import { useState } from 'react';
import Dropdown from './Dropdown';
import { handleDaysOfDate, handleMonthOfDate } from '../utils/DateUtils';
import './SearchForm.css';

function SearchForm({
  setRequestText,
  setRequestData,
  setRequestSort,
  submit,
}) {
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [dropDownDateState, setDropDownDateState] = useState('Today');
  const [dropDownSortState, setDropDownSortState] = useState('Popularity');

  const handleDropdownDateChange = (event) => {
    let dropDownValue = event.target.value;

    switch (dropDownValue) {
      case 'today':
        dropDownValue = handleDaysOfDate(0);
        break;
      case 'two-weeks-ago':
        dropDownValue = handleDaysOfDate(14);
        break;
      case 'one-month-ago':
        dropDownValue = handleMonthOfDate(1);
        break;
      default:
        dropDownValue = handleDaysOfDate(0);
    }
    setDropDownDateState(dropDownValue);
    setSearchDate(dropDownValue);
  };

  const handleDropdownSortChange = (event) => {
    let dropDownSortValue = event.target.value;

    setDropDownSortState(dropDownSortValue);
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    setRequestText(searchText);
    setRequestData(searchDate);
    setRequestSort(dropDownSortState);
    submit();
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
        <div className="dropdown-menus">
          <Dropdown
            options={[
              { label: 'Today', value: 'today' },
              { label: 'Two weeks ago', value: 'two-weeks-ago' },
              { label: 'One month ago', value: 'one-month-ago' },
            ]}
            value={dropDownDateState}
            onChange={handleDropdownDateChange}
          />
          <Dropdown
            options={[
              { label: 'Popularity', value: 'popularity' },
              { label: 'PublishedAt', value: 'publishedAt' },
              { label: 'Relevancy', value: 'relevancy' },
            ]}
            value={dropDownSortState}
            onChange={handleDropdownSortChange}
          />
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
