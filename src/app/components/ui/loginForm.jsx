import { useEffect, useState } from "react";
import { TextField } from "../common/form/textField";
import { validator } from "../../utils/validator";
import { CheckBoxField } from "../common/form/checkBoxField";

export const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  // const handleChange = ({ target: { value, name }  }) => {
  //   setData({ ...data, [name]: value });
  // };

  const handleChange = (e) => {
    // console.log(e);
    // const { name, value } = e.target || e;
    const { name, value } = e.target ? e.target : e; // Определение источника данных
    // Извлечение данных из объекта события или объекта данных
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log(data);
    if (!isValid) return;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Email is invalid" },
    },
    password: {
      isRequired: { message: "Password is required" },
      isCapitalized: { message: "Password must be capitalized" },
      isContainDigit: { message: "Password must contain a digit" },
      min: {
        message: "Password must be at least 8 characters",
        value: 8,
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // у объектов нет длины и булеан пустого объекта true
    return Object.keys(errors).length === 0; // true or false
  };

  // console.log("errors", errors);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Почта"
          onChange={handleChange}
          type="search"
          name="email"
          value={data.email}
          error={errors.email}
        />
        <TextField
          label="Пароль"
          onChange={handleChange}
          type="password"
          name="password"
          value={data.password}
          error={errors.password}
        />
        <CheckBoxField
          name="rememberMe"
          onChange={handleChange}
          value={data.rememberMe}
        >
          остаться в системе
        </CheckBoxField>
        <button
          type="submit"
          disabled={!(Object.keys(errors).length === 0)}
          className="btn btn-primary w-100 mx-auto"
        >
          Submit
        </button>
        {/* type="button" отменяет отправку формы */}
      </form>
    </>
  );
};
