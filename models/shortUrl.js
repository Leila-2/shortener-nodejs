const mongoose = require('mongoose')
const { nanoid } = require('nanoid')
const Joi = require('joi')
const { handleSchemaValidationErrors } = require('../helpers')

const shortUrlSchema = mongoose.Schema({
    full: {
        unique: true,
        type: String,
        required: true,

    },
    short: {
        type: String,
        required: true,
        default: () => nanoid(6),
        unique: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false, timestamps: true })


shortUrlSchema.post("save", handleSchemaValidationErrors);

const addSchema = Joi.object({
    fullUrl: Joi.string().required()
})

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema)

module.exports = {
    ShortUrl,
    addSchema
}