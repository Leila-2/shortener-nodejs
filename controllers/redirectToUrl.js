const { ShortUrl } = require('../models/shortUrl')
const { RequestError } = require('../helpers')

const redirectToUrl = async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (!shortUrl) throw RequestError(404, "Not found")

    shortUrl.clicks++
    await shortUrl.save()

    res.redirect(shortUrl.full)
}

module.exports = redirectToUrl