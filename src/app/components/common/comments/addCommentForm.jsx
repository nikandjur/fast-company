import React, { useState } from "react";

import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import { TextArea } from "../form/textArea";

export const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    // const { name, value } = e.target ? e.target : e; // Определение источника данных
    // Извлечение данных из объекта события или объекта данных
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleChange = (e) => {
  //   const target = e.target;
  //   console.log(e.target.value);
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }));
  // };

  const validatorConfig = {
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextArea
          value={data.content || ""}
          onChange={handleChange}
          name="content"
          label="Сообщение"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Опубликовать</button>
        </div>
      </form>
    </div>
  );
};
