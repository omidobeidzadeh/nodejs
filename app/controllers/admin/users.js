const dateService = require('../../services/dateService')
const userModel = require('../../models/user')
const userValidator = require('../../validators/user')
exports.index = async (req, res) => {
  const users = await userModel.findAll()
  const presenteduser = users.map((user) => {
    user.jalaliPersian = dateService.toPersianDate(user.created_at)
    return user
  })
  res.adminRender('admin/users/index', { users: presenteduser })
}
exports.create = async (req, res) => {
  res.adminRender('admin/users/create')
}
exports.store = async (req, res) => {
  const userData = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }
  const errors = userValidator.create(userData)
  if (errors.length > 0) {
    req.flash('errors', errors)
    res.redirect('/admin/users/create')
  } else {
    const insertId = await userModel.create(userData)
    if (insertId) {
      req.flash('success', 'کاربر با موفقیت ایجاد شد')
      res.redirect('/admin/users')
    }
  }
}
exports.remove = async (req, res) => {
  const userID = req.params.userId
  if (parseInt(userID) === 0) {
    res.redirect('/admin/users')
  }
  const result = await userModel.delete(userID)
  res.redirect('/admin/users')
}

exports.edit = async (req, res) => {
  const userID = req.params.userId
  if (parseInt(userID) === 0) {
    res.redirect('/admin/users')
  }
  const user = await userModel.find(userID)
  
  res.adminRender('admin/users/edit', {
    layout: 'admin',
    user,
    helpers: {IsUserRole: function(role, options){
      return user.role == role ? options.fn(this) : options.inverse(this);
    }
  }
  })
}
exports.update = async (req, res) => {
  const userID = req.params.userId
  const userData = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }
  if (parseInt(userID) === 0) {
    res.redirect('/admin/users')
  }
  const errors = userValidator.create(userData)
  if (errors.length > 0) {
    req.flash('errors', errors)
    res.redirect('/admin/users/create')
  } else{
    const result = await userModel.update(userID, userData)
  req.flash('success', 'کاربر با موفقیت ویرایش شد')
  return res.redirect('/admin/users')
  }
}
