import { useEffect, useState } from "react";
import API from "../../../api";
import { validator } from "../../../utils/validator";
import { SelectField } from "../form/selectField";
import { TextArea } from "../form/textArea";
const initialData = { userId: "", content: "" };

export const AddCommentForm = ({ onClick }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    API.users.fetchAll().then((data) => {
      const usersData = data.map((user) => ({
        value: user._id,
        label: user.name,
      }));
      setUsers(usersData);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    // const { name, value } = e.target ? e.target : e; // Определение источника данных
    // Извлечение данных из объекта события или объекта данных
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const handleChange = (target) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }));
  // };
  const clearForm = () => {
    setData(initialData);
    setErrors({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.userId || !data.content) return;
    const isValid = validate();
    if (!isValid) return;
    //   const comment = {
    //   content: newComment,
    //   pageId: userId,
    //   userId: data.user,
    // };
    onClick(data);
    clearForm();
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    userId: {
      isRequired: { message: "User is required" },
    },
    content: {
      isRequired: { message: "Content is required" },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // у объектов нет длины и булеан пустого объекта true
    return Object.keys(errors).length === 0; // true or false
  };

  return (
    <>
      {!isLoading ? (
        <div>
          <form onSubmit={handleSubmit}>
            <SelectField
              onChange={handleChange}
              options={users}
              name="userId"
              label="ADD COMMENT"
              value={data.userId}
              defaultOption="Choose..."
              error={errors.userId}
            />
            <TextArea
              value={data.content}
              onChange={handleChange}
              label="Comment"
              name="content"
              error={errors.content}
            />

            <div className="d-flex justify-content-end">
              <button className="btn btn-outline-secondary">
                <i className={"bi bi-send"}>submit</i>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h2> Loading... </h2>
      )}
    </>
  );
};
