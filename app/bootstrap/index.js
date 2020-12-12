const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const fileUpload = require('express-fileupload')
const sessionStore = require('./session-handler/mysql')(session)

module.exports = (app) => {
  app.use( 
    session({
      store: sessionStore,
      secret: 'asdrft6irt7ur596t7yu89ir5t67yu8i',
      resave: true,
      saveUninitialized: true,
      cookie: {maxAge: 60000},
    }),
  )
  app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 }
  }))
  app.use(flash()) 
  app.use(cookieparser())
  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({ extended: true }))
  app.engine('handlebars', hbs())
  app.set('view engine', 'handlebars')
  app.set('views', path.join(__dirname, '../views'))
  app.use('/static', express.static(path.join(__dirname, '../../public')))
};
