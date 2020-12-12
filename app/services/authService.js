const userModel = require('../models/auth')
const hashService = require('../services/hashService')
const userRoles = require('../models/userRoles')
exports.login = async (email, plainPass) => {
    const user = await userModel.findByEmail(email)
    if(!user){
        return false
    }
    const {password} = user
    return hashService.comparePassword(plainPass, password) ? user : false
}
exports.register = async (name, email, password) => {
    const insertId = await userModel.create({
        full_name: name,
        email,
        password,
        role: userRoles.user
    })
    return insertId
}