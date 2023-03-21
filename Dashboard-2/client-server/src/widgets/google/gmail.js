const { response } = require('express');
const { google} = require('googleapis');
const { oauth2Client } = require("../../Oauth2/GoogleAuth2");

async function detectNewMail() {
    let nb_messages = new Promise((resolve, reject) => {
        const gmail = google.gmail({version: 'v1', auth: oauth2Client});
        gmail.users.messages.list({userId: 'me'}, (error, response) => {
            if (error){
            console.log(error)
            return
            }
            const messageID = response["data"]["messages"][0]["id"]
            gmail.users.messages.get({userId: "me", "id": messageID}, (err, res) => {
                if (err){
                console.log(err)
                return
                }
                resolve(res.data.labelIds.includes("UNREAD"))
            })
        });
    });
    return nb_messages;
}

module.exports = { detectNewMail };