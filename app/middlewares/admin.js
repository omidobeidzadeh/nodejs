const userRoles = require('../models/userRoles')
module.exports =(req, res, next) => {
    if(req.session.user.role !== userRoles.admin){
        res.redirect('/')
    }
    next()
};
