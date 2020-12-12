
exports.create =  (request) => {
  
    const errors = [];
    if (request.comment == '') {
      errors.push("محتوا نمیتواند خالی باشد!");
    }
    if(request.user_name == ''){
        errors.push("نام نمیتواند خالی باشد!")
    }
    if(request.user_email == ''){
        errors.push("ایمیل نمیتواند خالی باشد!")
    }
    return errors;
};
