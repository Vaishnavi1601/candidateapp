import React from 'react'
import Select from 'react-select'
import '../styles/Filters.css'

export default function Filters(props) {
  const { options, placeholder, onChangeHandlers } = props;

  const handleMultiSelectChange = (selectedOptions) => {
    onChangeHandlers.forEach(handler => handler(selectedOptions));
  };
  return (
    <>
    <div>
      <Select
          options={options.map((eachOption) => ({
            value: eachOption,
            label: eachOption,
          }))}
          isMulti
          name={`filters-${placeholder}`}
          className="custom-select"
          classNamePrefix="select"
          placeholder={placeholder}
          onChange={handleMultiSelectChange}
        />
    </div>
    </>
  )
}
