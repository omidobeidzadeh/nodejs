const authService = require('../../services/authService')
const userRole = require('../../models/userRoles')
exports.showLogin = (req, res) => {
    res.newRender('auth/login', {layout: 'auth'})
}
exports.doLogin = async (req, res) => {
    const {email, password} = req.body
    const user = await authService.login(email, password)
    if(!user){
        req.flash('errors', 'ایمیل یا کلمه عبور معتبر نمیباشد')
        res.redirect('/auth/login')
    }
    req.session.user = user
    const pathToRedirect = user.role === userRole.admin ? '/admin/dashboard' : '/'
    return res.redirect(pathToRedirect)
} 
exports.showRegister = (req, res) => {
    res.newRender('auth/register', {layout: 'auth'})
}
exports.doRegister = async (req, res) => {
    const {name ,email, password, password_confirm} = req.body
    const newUser = await authService.register(name, email, password)
    if(!newUser){
        req.flash('errors', 'در حال حاضر امکان ثبت نام شما وجود ندارد')
        res.redirect('/auth/register')
    }
    res.redirect('/auth/login')
}
exports.logout = (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/auth/login')
      })
}