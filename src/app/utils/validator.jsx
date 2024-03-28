export function validator(arrayData, arrayConfig) {
  const errors = {};

  function validate(configName, data, config) {
    const validatorList =
      {
        isRequired: (data) => data.trim() === "",
        isEmail: (data) => !/^\S+@\S+\.\S+$/.test(data),
        isCapitalized: (data) => !/[A-Z]+/g.test(data),
        isContainDigit: (data) => !/\d+/g.test(data),
        min: (data) => data.length < config.value,
        isBoolean: (data) => data === false,
      }[configName] ?? "error";

    if (validatorList === "error") return "error validate";

    if (validatorList && validatorList(data)) {
      return config.message;
    }
  }

  // function validate(configName, data, config) {
  //   switch (configName) {
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

  for (const [dataName, dataValue] of Object.entries(arrayData || {})) {
    for (const [configName, configValue] of Object.entries(
      arrayConfig[dataName] || {} //проверка на undefined или null data или config[dataName].
    )) {
      const error = validate(configName, dataValue, configValue);
      if (error && !errors[dataName]) {
        errors[dataName] = error;
      }
    }
  }

  for (const dataName in arrayData) {
    for (const configName in arrayConfig[dataName]) {
      const error = validate(
        configName,
        arrayData[dataName],
        arrayConfig[dataName][configName]
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
