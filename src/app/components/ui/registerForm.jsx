import { useEffect, useState } from "react";
import { useProfessions } from "../../hooks/useProfession";
import { useQualities } from "../../hooks/useQualities";
import { validator } from "../../utils/validator";
import { CheckBoxField } from "../common/form/checkBoxField";
import { MultiSelectField } from "../common/form/multiSelectField";
import { RadioField } from "../common/form/radioField";
import { SelectField } from "../common/form/selectField";
import { TextField } from "../common/form/textField";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const { professions } = useProfessions();
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));
  const { qualities } = useQualities();
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }));

  // const handleChange = ({ target: { value, name }  }) => {
  //   setData({ ...data, [name]: value });
  // };

  // const handleChange = (target) => {
  // setData((prevData) => ({
  //     ...prevData,
  //     [target.name]: target.value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    // const { name, value } = e.target ? e.target : e;
    // Определение источника данных
    // Извлечение данных из объекта события или объекта данных
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("data", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };
    try {
      await signUp(newData);
      navigate("/");
    } catch (error) {
      setErrors(error);
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Email is invalid" },
    },
    name: {
      isRequired: { message: "Name is required" },
      min: {
        message: "Name must be at least 3 characters",
        value: 3,
      },
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
    profession: {
      isRequired: { message: "Profession is required" },
    },
    license: {
      isBoolean: { message: "вы должны принять лицензионное соглашение" },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // у объектов нет длины и булеан пустого объекта true
    return Object.keys(errors).length === 0; //true or false
  };

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
          label="Имя"
          onChange={handleChange}
          type="name"
          name="name"
          value={data.name}
          error={errors.name}
        />
        <TextField
          label="Пароль"
          onChange={handleChange}
          type="password"
          name="password"
          value={data.password}
          error={errors.password}
        />
        <SelectField
          label="Выберите профессию"
          defaultOption="Choose..."
          name="profession"
          options={professionsList}
          onChange={handleChange}
          value={data.profession}
          error={errors.profession}
        />
        <RadioField
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
          ]}
          value={data.sex}
          name="sex"
          onChange={handleChange}
        />
        <MultiSelectField
          options={qualitiesList}
          onChange={handleChange}
          defaultValue={data.qualities}
          name="qualities"
          label="Выберите качества"
        />
        <CheckBoxField
          name="license"
          onChange={handleChange}
          value={data.license}
          error={errors.license}
        >
          I have read and accept <a>terms and conditions</a>
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
// qualities = {
//   tedious: { _id: "67rdca98", name: "Нудила", color: "primary" },
// };
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
