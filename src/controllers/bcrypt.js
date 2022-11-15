const bcrypt = require('bcrypt');

const SALT = 12

const createHash = (password) => {
    return bcrypt.hashSync(password, SALT)
}

const compareHash = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = { createHash, compareHash }