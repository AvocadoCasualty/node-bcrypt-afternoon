require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('./controllers/authController')

app.use(express.json())
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24}
    })
)
// Endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('DB acquired')
    app.listen(SERVER_PORT, () =>
        console.log(`Server running on port ${SERVER_PORT}`)
    )
})