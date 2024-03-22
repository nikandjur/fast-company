export const RadioField = ({
  options,
  name,
  onChange,
  value,
  label = "Пол",
}) => {
  return (
    <div className="mb-4">
      <label className="form-label pe-4">{label}</label>
      <div>
        {options &&
          options.map((option) => (
            <div
              key={option.name + "_" + option.value}
              className="form-check form-check-inline "
            >
              <input
                className="form-check-input"
                type="radio"
                name={name}
                id={option.name + "_" + option.value}
                checked={option.value === value}
                value={option.value}
                onChange={onChange}
              />
              <label
                className="form-check-label"
                htmlFor={option.name + "_" + option.value}
              >
                {option.name}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};
