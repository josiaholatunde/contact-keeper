const bcrypt = require('bcryptjs')

const hashPassword = async passwordText => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(passwordText, salt);
    } catch (err) {
        return '1278mnbcxzsasew5432';
    }
}

module.exports = hashPassword