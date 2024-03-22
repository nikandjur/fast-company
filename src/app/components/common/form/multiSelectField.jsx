import Select from "react-select";

export const MultiSelectField = ({
  options,
  onChange,
  name,
  label,
  defaultValue,
}) => {
  let optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? //преобразуем объект в валидный для библиотеки "react-select" массив
        Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: optionName,
        }))
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      {defaultValue && (
        <Select
          isMulti
          closeMenuOnSelect={false}
          defaultValue={defaultValue}
          onChange={handleChange}
          options={optionsArray}
          className="basic-multi-select"
          classNamePrefix="select"
          name={name}
        />
      )}
    </div>
  );
};
