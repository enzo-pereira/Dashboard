const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllUsers(req, res) {
    try {
        const allUsers = await prisma.user.findMany();
        console.log(allUsers);
        res.status(200).json(allUsers);
    } catch(err) {
        res.status(500).json({ error: err });
    }
}

async function getUserById(req, res) {
    try {
        const User = await prisma.user.findUnique({
            where: { id: +req.params.id },
        })
        console.log(User);
        res.status(200).json(User);
    } catch(err) {
        res.status(500).json({ error: err });
    }
}

async function updateUser(req, res) {
    try {
        const {email, password } = req.body
        const updatedUser = await prisma.user.update({
            where: {id: +req.params.id},
            data: {
                email: email,
                password: password,
            }
        });
        console.log(updatedUser);
        res.status(200).json(updatedUser);
    } catch(err) {
        res.status(500).json({ error: err });
    }
}

async function deleteUser(req, res) {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: +req.params.id },
        })
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    getAllUsers, getUserById, updateUser, deleteUser
  };