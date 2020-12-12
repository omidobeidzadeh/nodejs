const routerAdmin = require('./admin');
const routerAuth = require('./auth')
const routerFront = require('./front')
const auth = require('../middlewares/auth.js');
const guest = require('../middlewares/guest');
const admin = require('../middlewares/admin');
const authController = require("../controllers/auth");

module.exports = app => {
    app.use('/', routerFront)
    app.use('/admin',[auth, admin] , routerAdmin)
    app.use('/auth',[guest] , routerAuth)
    app.get('/logout', authController.logout)
}; 


