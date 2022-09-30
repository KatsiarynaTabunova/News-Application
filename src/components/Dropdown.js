import './Dropdown.css';

function Dropdown({ value, options, onChange, setDropDownState }) {
  return (
    <select
      className="dropdown-menu"
      value={setDropDownState}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
export default Dropdown;
