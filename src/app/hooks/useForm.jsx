import { useState } from "react";
// import TextField from "../components/common/form/textField";
// import SelectField from "../components/common/form/selectField";
// import colors from "../constants/colors.json";

const useForm = (initialState = {}, onSubmit) => {
  const [form, setForm] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  const handleChange = (target) => {
    setForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  //   const formComponent = () => (
  //     <form onSubmit={handleSubmit}>
  //       <TextField
  //         label="Наименование"
  //         name="name"
  //         onChange={handleChange}
  //         value={form.name || ""}
  //       />
  //       <SelectField
  //         label="Цвет"
  //         name="color"
  //         options={colors}
  //         onChange={handleChange}
  //         value={form.color || ""}
  //       />
  //       <button className="btn btn-primary">Submit</button>
  //     </form>
  //   );
  //   return { form, handleSubmit, handleChange, formComponent: formComponent() };

  return { form, handleSubmit, handleChange };
};

export default useForm;
