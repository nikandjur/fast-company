export function validator(data, config) {
  console.log(data);
  const errors = {};

  function validate(validateMethod, data, config) {
    const validator =
      {
        isRequired: (data) => data.trim() === "",
        isEmail: (data) => !/^\S+@\S+\.\S+$/.test(data),
        isCapitalized: (data) => !/[A-Z]+/g.test(data),
        isContainDigit: (data) => !/\d+/g.test(data),
        min: (data) => data.length < config.value,
        isBoolean: (data) => data === false,
      }[validateMethod] ?? (() => true);

    if (validator && validator(data)) {
      return config.message;
    }
  }

  // function validate(validateMethod, data, config) {
  //   let statusValidate;
  //   switch (validateMethod) {-
  //     case "isRequired":
  //       if (data.trim() === "") return config.message;
  //       break;
  //     case "isEmail":
  //       const emailRegExp = /^\S+@\S+\.\S+$/;
  //       if (!emailRegExp.test(data)) return config.message;
  //       break;
  //     case "isCapitalized":
  //       const capitalRegExp = /[A-Z]+/g;
  //       if (!capitalRegExp.test(data)) return config.message;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  for (const [dataName, dataValue] of Object.entries(data || {})) {
    for (const [validateMethod, configValue] of Object.entries(
      config[dataName] || {} //проверка на undefined или null data или config[dataName].
    )) {
      const error = validate(validateMethod, dataValue, configValue);
      if (error && !errors[dataName]) {
        errors[dataName] = error;
      }
    }
  }

  for (const dataName in data) {
    for (const validateMethod in config[dataName]) {
      const error = validate(
        validateMethod,
        data[dataName],
        config[dataName][validateMethod]
      );
      //добавляем ошибку в объект errors если она существует или для данного поля не было других ошибок.
      if (error && !errors[dataName]) {
        errors[dataName] = error;
      }
      // if (typeof error !== "undefined") {
      // if (error !== undefined) {
      //   if (error)
      // }
    }
  }

  return errors;
}

// config = {
//   email: { isRequired: { message: "Email is required" } },
//   password: { isRequired: { message: "Password is required" } },
// };

// data = {
//   "email": "email",
//   "password": "pass"
// }
