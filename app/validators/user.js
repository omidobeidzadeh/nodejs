exports.create = (request) => {
    const errors = [];
    if (request.full_name == "") {
      errors.push("نام نمیتواند خالی باشد!");
    }
    if (request.email == "") {
      errors.push("ایمیل نمیتواند خالی باشد!");
    }
    if (request.password == "") {
      errors.push("پسورد نمیتواند خالی باشد!");
    }
    return errors;
  };