const { default: axios } = require("axios")
const express = require("express");

const reddit = express();

reddit.post("/api/reddit", async (req, res) => {
    console.log(req.body.url)
    try {
        const response = await axios.get(req.body.url + ".json")
        console.log(response.data[0].data.children[0].data.num_comments)
        const data = response.data[0].data.children[0].data.num_comments;
        res.status(200).send(String(data));
    } catch (error) {
        console.error(error)
    }
})

module.exports = {reddit};