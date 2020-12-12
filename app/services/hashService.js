const bcrypt = require('bcrypt')
exports.hashPassword = plainpass => {
    return bcrypt.hashSync(plainpass, 10)
}
exports.comparePassword = (plainpass, hashpass) => {
    return bcrypt.compareSync(plainpass, hashpass)
}