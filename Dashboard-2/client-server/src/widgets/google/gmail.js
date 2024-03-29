const { google } = require('googleapis');
const { oauth2Client } = require('../../Oauth2/GoogleAuth2');

async function detectNewMail() {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
 
  return new Promise((resolve, reject) => {
    gmail.users.messages.list({ userId: 'me' }, (error, response) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      try {
        const messageID = response.data.messages[0].id;

        gmail.users.messages.get(
          { userId: 'me', id: messageID },
          (err, res) => {
            if (err) {
              console.log(err);
              reject(err);
              return;
            }

            const lastEmailDate = new Date(parseInt(res.data.internalDate));
            resolve(lastEmailDate);
          }
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
}

async function detectUserMail(num) {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  return new Promise((resolve, reject) => {
    gmail.users.messages.list({ userId: 'me' }, (error, response) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      try {
        console.log(num);
        const messageID = response.data.messages[Number(num)].id;

        gmail.users.messages.get(
          { userId: 'me', id: messageID },
          (err, res) => {
            if (err) {
              console.log(err);
              reject(err);
              return;
            }

            console.log(res.data.payload.headers[17].value)
            resolve(res.data.payload.headers[17].value);
          }
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
}

module.exports = { detectNewMail, detectUserMail};