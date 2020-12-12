module.exports = session => {
    var MySQLStore = require('express-mysql-session')(session);
var mysqlOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
};
var sessionStore = new MySQLStore(mysqlOptions);   
return sessionStore
}  