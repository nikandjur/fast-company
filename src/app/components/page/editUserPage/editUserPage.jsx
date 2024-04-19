import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../common/backButton";
import { MultiSelectField } from "../../common/form/multiSelectField";
import { RadioField } from "../../common/form/radioField";
import { SelectField } from "../../common/form/selectField";
import { TextField } from "../../common/form/textField";

export const EditUserPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const { currentUser, updateUserData } = useAuth();
  const { professions, isLoading: professionsLoading } = useProfessions();
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));
  const { qualities, isLoading: qualitiesLoading } = useQualities();
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }));

  // const handleChange = ({ target: { value, name }  }) => {
  //   setData({ ...data, [name]: value });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target || e;
    // console.log(name, value);
    // const { name, value } = e.target ? e.target : e; // Определение источника данных
    // Извлечение данных из объекта события или объекта данных
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getProfessionById = (id) => {
    const profession = professions.find((prof) => prof.value === id);
    return profession
      ? { _id: profession.value, name: profession.label }
      : null;
  };

  // const getAllUsers = () => navigate("/users");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    await updateUserData({
      ...data,
      qualities: data.qualities.map((q) => q.value),
    });
    navigate(`/users/${currentUser._id}`);
  };

  useEffect(() => {
    setIsLoading(false);
    if (currentUser && !qualitiesLoading && !professionsLoading) {
      // Преобразуем массив qualities в объект qualitiesById
      const qualitiesById = Object.fromEntries(
        qualities.map((quality) => [quality._id, quality])
      );

      // Преобразуем массив _id качеств пользователя в массив объектов качеств
      const dataQualities = currentUser.qualities.map((qualId) => {
        const quality = qualitiesById[qualId];
        return {
          label: quality.name,
          value: quality._id,
          color: quality.color,
        };
      });

      // Обновляем состояние с преобразованными данными качеств
      setData({
        ...currentUser,
        qualities: dataQualities,
      });
      setIsLoading(true);
    }
  }, [currentUser, qualities, qualitiesLoading, professionsLoading]);

  useEffect(() => {
    validate();
  }, []);

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Email is invalid" },
    },
    profession: {
      isRequired: { message: "Profession is required" },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // у объектов нет длины и булеан пустого объекта true
    return Object.keys(errors).length === 0; //true or false
  };

  return (
    <div className="col-md-6 offset-md-3 shadow p-4">
      <div className="container mt-5">
        <BackHistoryButton />
        {
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              onChange={handleChange}
              type="search"
              name="name"
              value={data.name || ""}
              error={errors.email}
            />
            <TextField
              label="Почта"
              onChange={handleChange}
              type="search"
              name="email"
              value={data.email || ""}
              error={errors.email}
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

            <button
              type="submit"
              disabled={!(Object.keys(errors).length === 0)}
              className="btn btn-primary w-100 mx-auto"
            >
              Submit
            </button>
            {/* type="button" отменяет отправку формы */}
          </form>
        }
      </div>
    </div>
  );
};

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

// profession: {
//   "_id": "67rdca3eeb7f6fgeed471824",
//   "name": "Актер"
// }
// qualities:[
//   {
//       "_id": "67rdca3eeb7f6fgeed471102",
//       "name": "Красавчик",
//       "color": "info"
//   }
// ]
