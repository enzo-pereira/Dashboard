const { google} = require('googleapis');

async function detectNewMail(oauth2Client) {
    console.log("aaaaaaaaaaaaaaaaaaaa")
    const gmail = google.gmail({version: 'v1', auth: oauth2Client});
    console.log("bbbbbbbbbbbbbbbbbbbbbbb")

    
    console.log("ccccccccccccccccccccc")
    console.log(mail_list)
    let nb_messages = 0;

    if (mail_list.data.messages) {
        nb_messages = mail_list.data.messages.length;
    }
    return nb_messages;
}

module.exports = { detectNewMail };