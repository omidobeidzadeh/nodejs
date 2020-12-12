const gravatar = require('gravatar')
const userService = require('../services/userService')
const settingModel = require('../models/setting')


module.exports = app => {
    app.use(async(req, res, next) => {
        const errors = req.flash('errors')
        const success = req.flash('success')
        const hasError = errors.length > 0
        let user = null
        if('user' in req.session){
            user = req.session.user
            user.avatar = userService.gravatar(user.email)
        }
        res.newRender = (template, options) => {
            options = {...options, hasError, errors, success}
            res.render(template, options)    
        }
        const title = await settingModel.get('website_title')   
        const description = await settingModel.get('website_description')
        
        res.frontRender = (template, options) => {
            options = {...options, bodyClass:'single-post', errors, hasError, layout: 'front', title, description}
            res.render(template, options)    
        }
        res.adminRender = (template, options) => {
            options = {...options, layout: 'admin', hasError, errors, success, user}
            res.render(template, options)    
        }
        next()
    })
}