const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

//const ShortUrl = require('./models/shortUrl')
const shortenerRouter = require('./routes/api/shortener')
const app = express()


mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('database connect success'))
    .catch((error) => {
        console.log(error.message)
        process.exit(1)
    })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', shortenerRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})
app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message })
})

app.listen(process.env.PORT || 8000)