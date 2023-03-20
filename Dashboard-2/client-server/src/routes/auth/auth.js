const express = require('express');
const {login, registerNewUser, linkOAuthToUser} = require('./authQueries');

const auth = express();

auth.post('/login', async function (req, res) {
    const body = req.body;
    const username = body['username'];
    const email = body['email'];
    const password = body['password'];
    console.log(body);
    console.log(username + ' ' + email + ' ' + password);
    console.log("Login page POST");
    const data = {
        email: email,
        password: password,
        id: undefined,
    }
    const token = await login(data, res);
    console.log(`token : ${token}`);
    res.setHeader('Authorization', `Bearer ${token}`);
    res.json({ token: token });
});

auth.post('/register', async (req, res) => {
    const body = req.body
    const username = body['username'];
    const email= body['email'];
    const password = body['password'];
    const data = {
        email: email,
        password: password,
        id: undefined
    }
    console.log(data);
    const token = await registerNewUser(data, "");
    res.setHeader('Authorization', `Bearer ${token}`);
    res.json({ token: token });
});

module.exports = {auth};