const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
require('./cronDelete')
//const ShortUrl = require('./models/shortUrl')
const shortenerRouter = require('./routes/api/shortener')
const shortenerPages = require('./routes/pages/shortener')
const app = express()



app.set('view engine', 'ejs')

app.use(express.json())
app.use('/api/urls', shortenerRouter)
app.use('/', shortenerPages)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})
app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message })
})

mongoose.connect(process.env.DB_HOST).then(() => app.listen(process.env.PORT || 8000))
    .catch((error) => {
        console.log(error.message)
        process.exit(1)
    })
