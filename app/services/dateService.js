const mj = require('jalali-moment');
exports.toPersianDate = (date) => {
    return mj(date).locale('fa').format('YYYY/MM/DD');
};