import { useState } from 'react';
import Dropdown from './Dropdown';
import { handleDaysOfDate, handleMonthOfDate } from '../utils/DateUtils';
import './SearchForm.css';

function SearchForm({
  setRequestText,
  setRequestData,
  setRequestSort,
  submit,
  showInputError,
}) {
  const [searchDate, setSearchDate] = useState('');
  const [dropDownDateState, setDropDownDateState] =
    useState('Choose the option');
  const [dropDownSortState, setDropDownSortState] = useState('Popularity');

  const handleDropdownDateChange = (event) => {
    let dropDownValue = event.target.value;

    switch (dropDownValue) {
      case 'choose the option':
        dropDownValue = 0;
        break;
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

    setRequestData(searchDate);
    setRequestSort(dropDownSortState);

    // localStorage.setItem('searchText', searchText);
    // localStorage.setItem('udate', searchDate ? user : '');
    submit();
  }

  return (
    <form className="header" onSubmit={handleFormSubmit}>
      <div>
        <label className="label">Search form:</label>
        <input
          className={showInputError === true ? 'error' : 'none'}
          type="text"
          onChange={(e) => {
            console.log('setSearchText=' + e.target.value);
            setRequestText(e.target.value);
          }}
          placeholder="enter information"
        />

        <button type="submit">Search</button>
        <div className="dropdown-menus">
          <label className="label">Exact date:</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <Dropdown
            labelValue="Date:"
            options={[
              { label: 'Choose the option', value: 'choose the option' },
              { label: 'Today', value: 'today' },
              { label: 'Two weeks ago', value: 'two-weeks-ago' },
              { label: 'One month ago', value: 'one-month-ago' },
            ]}
            value={dropDownDateState}
            onChange={handleDropdownDateChange}
          />
          <Dropdown
            labelValue="Sorting:"
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
