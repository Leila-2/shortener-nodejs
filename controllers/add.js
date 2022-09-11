const ShortUrl = require('../models/shortUrl')
//const urlExists = require('url-exists')

const add = async (req, res) => {
    // const isExist = await urlExists(req.body.fullUrl, function (err, exists) {
    //     console.log(exists)
    // })
    try {
        await ShortUrl.create({ full: req.body.fullUrl })
        res.redirect('/')
    } catch (error) {
        console.log(err);
        res.status(500).json('Server Error');
    }
}

module.exports = add