import { useEffect, useState } from "react";
import { TextField } from "../common/form/textField";
import { validator } from "../../utils/validator";
import { CheckBoxField } from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const { logIn } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);

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
    setEnterError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      await logIn(data);

      // navigate("/users");
      navigate("/users");
    } catch (error) {
      setEnterError(error.message);
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
    },
    password: {
      isRequired: { message: "Password is required" },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // у объектов нет длины и булеан пустого объекта true
    return Object.keys(errors).length === 0; // true or false
  };

  const isValid = Object.keys(errors).length === 0;

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
        {enterError && <p className="text-danger">{enterError}</p>}
        <button
          className="btn btn-primary w-100 mx-auto"
          type="submit"
          disabled={!isValid || enterError}
        >
          Submit
        </button>
        {/* type="button" отменяет отправку формы */}
      </form>
    </>
  );
};
