const { ShortUrl } = require('../models/shortUrl')


const add = async (req, res) => {
    console.log(req.body.fullUrl)
    const result = await ShortUrl.create({ full: req.body.fullUrl })

    res.json(result)
}

module.exports = add