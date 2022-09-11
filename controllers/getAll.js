const ShortUrl = require('../models/shortUrl')

const getAll = async (req, res) => {
    try {
        const shortUrls = await ShortUrl.find()
        res.render('index', { shortUrls: shortUrls })
    } catch (error) {
        console.log(error)
    }

}

module.exports = getAll