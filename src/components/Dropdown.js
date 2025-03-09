import React from 'react';

// Capitalizes the first letter of every word in the string
const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

const Dropdown = ({
  name,
  value,
  handleChange,
  options = [],
  placeholder,
  disabled = false,
  getOptionValue,
  getOptionLabel,
}) => {
  // Default accessors for objects or primitive strings
  const defaultGetOptionValue = (option) =>
    typeof option === 'object' ? option.name || option.mainMuscle : option;
  const defaultGetOptionLabel = (option) =>
    typeof option === 'object' ? option.name || option.mainMuscle : option;

  const optionValueAccessor = getOptionValue || defaultGetOptionValue;
  const optionLabelAccessor = getOptionLabel || defaultGetOptionLabel;

  return (
    <select name={name} value={value} onChange={handleChange} disabled={disabled}>
      <option value="">{placeholder}</option>
      {options.length > 0 ? (
        options.map((option, index) => {
          const optionValue = optionValueAccessor(option);
          let optionLabel = optionLabelAccessor(option);
          optionLabel = capitalizeWords(optionLabel);
          return (
            <option key={index} value={optionValue}>
              {optionLabel}
            </option>
          );
        })
      ) : (
        <option disabled>Loading options...</option>
      )}
    </select>
  );
};

export default Dropdown;
