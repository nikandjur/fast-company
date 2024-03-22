export const CheckBoxField = ({ name, value, error, onChange, children }) => {
  const handleChange = () => {
    onChange({
      name: name,
      value: !value,
    });
  };
  return (
    <div className="form-check mb-4">
      <input
        className={"form-check-input" + (error ? " is-invalid" : "")}
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
        checked={value}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
