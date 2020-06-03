const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const {username, password, isAdmin} = req.body
        const db = req.app.get('db')

        //Check if user already exists
        const existingUser = await db.get_user([username])

        if (existingUser[0]) {
            return res.status(409).send('Username taken')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const registeredUser = await db.register_user([isAdmin, username, hash])
        const user = registeredUser[0]

        req.session.user = {
            isAdmin: user.is_admin,
            username: user.username,
            id: user.id
        }
        res.status(201).send(req.session.user)

    },

    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')


    }
}