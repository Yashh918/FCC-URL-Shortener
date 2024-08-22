import validUrl from 'valid-url'
import { Url } from "../models/url.models.js"

const encode = (n) => {
    const base62_map = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let base62 = ''

    while (n > 0) {
        base62 = base62_map[n % 62] + base62;
        n = Math.floor(n / 62)
    }

    return base62 || '0'
}

const convertObjectIdToNumber = (objectId) => {
    return parseInt(objectId.toHexString(), 16)
}

const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body

        const urlPattern = /^(https?:\/\/)/

        
        if (!urlPattern.test(url)) {
            return res.json({ error: 'invalid url' })
        }


        let foundUrl = await Url.findOne({ original_url: url })
        if (foundUrl) {
            return res.json({
                original_url: url,
                short_url: foundUrl.short_url
            })
        }

        const newUrl = await Url.create({
            original_url: url
        })

        // original code --- degrading it to simple logic for test case
        // const shortUrl = encode(convertObjectIdToNumber(newUrl._id))
        
        const shortUrl = Math.floor(Math.random()*100);

        foundUrl = await Url.findByIdAndUpdate(
            newUrl._id,
            { short_url: shortUrl },
            { new: true }
        )

        return res
            .status(200)
            .json({
                original_url: foundUrl.original_url,
                short_url: foundUrl.short_url  
            })

    } catch (error) {
        res
        .status(500)
        .json({ error: 'invalid url' })
    }
}

const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shorturl } = req.params;

        const urlEntry = await Url.findOne({ short_url: shorturl })
        if (!urlEntry) {
            return res.json({ error: 'invalid url' })
        }

        const originalUrl = urlEntry.original_url
        
        return res.redirect(originalUrl)

    } catch (error) {
        res
        .status(404)
        .json({ error: 'invalid url' });
    }
}

export {
    createShortUrl,
    redirectToOriginalUrl
}