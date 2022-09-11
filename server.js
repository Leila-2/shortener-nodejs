const express = require('express')
const mongoose = require('mongoose')
const urlExists = require('url-exists')
require('dotenv').config()
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('database connect success')).catch((error) => console.log(error.message))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {
    try {
        const shortUrls = await ShortUrl.find()
        res.render('index', { shortUrls: shortUrls })
    } catch (error) {
        console.log(error)
    }

})

app.post('/shortUrls', async (req, res) => {
    const isExist = await urlExists(req.body.fullUrl, function (err, exists) {
        console.log(exists)
    })
    const findUrl = await ShortUrl.findOne({ full: req.body.fullUrl })
    if (isExist && findUrl === req.body.fullUrl) {
        try {
            await ShortUrl.create({ full: req.body.fullUrl })
            res.redirect('/')
        } catch (error) {
            console.log(err);
            res.status(500).json('Server Error');
        }
    }
    else {
        res.status(400).json('Invalid Full Link');
    }

})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})
app.listen(process.env.PORT || 8000)