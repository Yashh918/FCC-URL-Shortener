import{ model, Schema } from "mongoose"

const urlSchema = new Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String
    }
})

export const Url = model("Url", urlSchema)