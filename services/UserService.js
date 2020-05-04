const User = require('../models/User')


module.exports = {
    getUser: async (searchParams) => {
        try {
            const user = await User.find(searchParams)
            return user;
        } catch (err) {
            console.log(err)
            return null;
        }
    }
}