const express = require('express');
const { PrismaClient } = require('@prisma/client');
const userQueries = require('./userQueries');

const prisma = new PrismaClient();

const user = express();

user.get('/users', async function (req, res) {
    // res.send("User page")
    console.log("GET all users !");
    userQueries.getAllUsers(req, res).then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        res.status(500);
    });
});

user.get('/users:id', async function (req, res) {
    // res.send("User page")
    console.log("GET one user !");
    userQueries.getUserById(req, res).then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        res.status(500);
    });
});

user.put('/users:id', async (req, res) => {
    userQueries.updateUser(req, res).then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        res.status(500);
    });
});

module.exports = {user};