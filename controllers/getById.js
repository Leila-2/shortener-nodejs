const ShortUrl = require('../models/shortUrl')

const getById = async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    await shortUrl.save()

    res.redirect(shortUrl.full)
}

module.exports = getById