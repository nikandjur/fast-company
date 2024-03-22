import { useState } from "react";

export const TextField = ({ label, onChange, type, name, value, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          onChange={onChange}
          type={showPassword ? "text" : type}
          id={name}
          value={value}
          name={name}
          className={
            error ? "form-control is-invalid" : "form-control is-valid"
          }
        />
        {type === "password" && (
          <button
            onClick={toggleShowPassword}
            className="btn btn-outline-secondary"
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
};
