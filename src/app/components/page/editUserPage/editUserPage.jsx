import { useEffect, useState } from "react";
import { TextField } from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import API from "../../../api";
import { SelectField } from "../../common/form/selectField";
import { RadioField } from "../../common/form/radioField";
import { MultiSelectField } from "../../common/form/multiSelectField";
import { CheckBoxField } from "../../common/form/checkBoxField";
import { transform } from "lodash";
import { useNavigate, useParams } from "react-router-dom";

// email: "",
// password: "",
// profession: "",
// sex: "male",
// qualities: [],
// license: false,

export const EditUserPage = () => {
  const { userId } = useParams();
  const [data, setData] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const handleChange = ({ target: { value, name }  }) => {
  //   setData({ ...data, [name]: value });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target || e;
    console.log(name, value);
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

  // const getProfessionById = (id) => {
  //   for (const prof of professions) {
  //     if (prof.value === id) {
  //       return { _id: prof.value, name: prof.label };
  //     }
  //   }
  // };

  const getQualities = (elements) => {
    return elements.map((elem) => ({
      _id: elem.value,
      name: elem.label,
      color: elem.color,
    }));
  };

  // const getQualities = (elements) => {
  //   const qualitiesArray = [];
  //   for (const elem of elements) {
  //     for (const quality in qualities) {
  //       if (elem.value === qualities[quality].value) {
  //         qualitiesArray.push({
  //           _id: qualities[quality].value,
  //           name: qualities[quality].label,
  //           color: qualities[quality].color,
  //         });
  //       }
  //     }
  //   }
  //   console.log("qualitiesArray", qualitiesArray);
  //   return qualitiesArray;
  // };

  const navigate = useNavigate();

  // const getAllUsers = () => navigate("/users");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    API.users
      .update(userId, {
        ...data,
        profession: getProfessionById(data.profession),
        qualities: getQualities(data.qualities),
      })
      .then(() => navigate("/users"));
  };

  const transformData = (dataQualities) => {
    return dataQualities.map((quality) => ({
      label: quality.name,
      value: quality._id,
      color: quality.color,
    }));
  };

  useEffect(() => {
    setIsLoading(true);

    API.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        profession: profession._id,
        qualities: transformData(qualities),
      }))
    );

    API.professions.fetchAll().then((data) => {
      const profTransformed = Object.keys(data).map((key) => ({
        label: data[key].name,
        value: data[key]._id,
      }));
      setProfessions(profTransformed);
    });

    API.qualities.fetchAll().then((data) => {
      const qualTransformed = Object.values(data).map((qual) => ({
        label: qual.name,
        value: qual._id,
        color: qual.color,
      }));
      setQualities(qualTransformed);
    });
    // API.qualities.fetchAll().then((data) => {
    //   const qualTransformed = Object.values(data).map(({ name, _id, color }) => ({
    //     label: name,
    //     value: _id,
    //     color,
    //   }));
    //   setQualities(qualTransformed);
    // });

    // или так

    // API.qualities.fetchAll().then((data) => {
    //   const qualTransformed = Object.keys(data).map((key) => ({
    //     label: data[key].name,
    //     value: data[key]._id,
    //     color: data[key].color,
    //   }));
    //   setQualities(qualTransformed);
    // });
  }, []);

  useEffect(() => {
    if (data._id) {
      setIsLoading(false);
    }
    console.log("data", data);
  }, [data]);

  // useEffect(() => {
  //   validate();
  // }, []);

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

  // console.log(data.profession.name);

  return (
    <div className="col-md-6 offset-md-3 shadow p-4">
      <div className="container mt-5">
        {!isLoading ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              onChange={handleChange}
              type="search"
              name="name"
              value={data.name}
              // error={errors.email}
            />
            <TextField
              label="Почта"
              onChange={handleChange}
              type="search"
              name="email"
              value={data.email}
              error={errors.email}
            />

            <SelectField
              label="Выберите профессию"
              defaultOption="Choose..."
              name="profession"
              options={professions}
              onChange={handleChange}
              value={data.profession}
              // error={errors.profession}
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
              options={qualities}
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
        ) : (
          <h1>Loading...</h1>
        )}
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
