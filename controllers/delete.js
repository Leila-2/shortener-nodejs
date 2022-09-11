const remove = async (req, res) => {
    try {
        const shortUrls = await ShortUrl.find()
        res.render('index', { shortUrls: shortUrls })
    } catch (error) {
        console.log(error)
    }

}


module.export = remove