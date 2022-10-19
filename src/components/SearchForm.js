import { useState } from 'react';
import Dropdown from './Dropdown';
import { handleDaysOfDate, handleMonthOfDate } from '../utils/DateUtils';
import './SearchForm.css';

function SearchForm({
  setRequestText,
  requestText,
  setRequestData,
  setRequestSort,
  submit,
  showInputError,
}) {
  const [searchDate, setSearchDate] = useState(
    localStorage.getItem('date') || ''
  );
  const [dropDownDateState, setDropDownDateState] = useState(
    localStorage.getItem('exactDate') || 'Choose the option'
  );
  const [dropDownSortState, setDropDownSortState] = useState(
    localStorage.getItem('sorting') || 'popularity'
  );

  const handleDropdownDateChange = (event) => {
    let dropDownValue = event.target.value;
    let formatedDate;
    switch (dropDownValue) {
      case 'choose the option':
        formatedDate = 0;
        break;
      case 'today':
      default:
        formatedDate = handleDaysOfDate(0);
        break;
      case 'two-weeks-ago':
        formatedDate = handleDaysOfDate(14);
        break;
      case 'one-month-ago':
        formatedDate = handleMonthOfDate(1);
        break;
    }
    setDropDownDateState(dropDownValue);
    setSearchDate(formatedDate);
  };

  const handleDropdownSortChange = (event) => {
    let dropDownSortValue = event.target.value;

    setDropDownSortState(dropDownSortValue);
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    setRequestData(searchDate);
    setRequestSort(dropDownSortState);

    // localStorage.setItem('searchText', requestText);
    localStorage.setItem('date', searchDate);
    localStorage.setItem('exactDate', dropDownDateState);
    localStorage.setItem('sorting', dropDownSortState);
    localStorage.setItem('error', showInputError);
    submit();
  }

  return (
    <form className="header" onSubmit={handleFormSubmit}>
      <div>
        <label className="label">Search form:</label>
        <input
          className={showInputError === true ? 'error' : 'none'}
          type="text"
          value={requestText}
          onChange={(e) => {
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
