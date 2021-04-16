const crypto = require('crypto');

function CrearSalt () {
  return crypto.randomBytes(16).toString('hex');
}

function CreateHash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
}

/**
 * Revisa que una contraseña esté correcta
 * 
 * @param {String} password 
 * @param {Object} User 
 * @returns Boolean
 */
function CheckPassword (password, User) {
  if (User == null) {
    return false;
  } else {
    const hash = CreateHash(password, User.salt)
    return hash === User.password
  }
}

module.exports = {
  CrearSalt,
  CreateHash,
  CheckPassword
}