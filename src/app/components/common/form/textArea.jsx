export const TextArea = ({ label, onChange, name, value, error }) => {
  //   const handleChange = ({ target }) => {
  //     onChange({ name: target.name, value: target.value });
  // };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          rows="3"
          // id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={
            error ? "form-control is-invalid" : "form-control is-valid"
          }
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
