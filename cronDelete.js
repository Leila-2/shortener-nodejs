const cron = require('node-cron')
const { ShortUrl } = require('./models/shortUrl')
console.log('Cron running')
cron.schedule('0 0 0 * * *', async function () {

    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    const ISODate = date.toISOString()
    await ShortUrl.deleteMany({ date: { $lte: ISOdate } });
});

