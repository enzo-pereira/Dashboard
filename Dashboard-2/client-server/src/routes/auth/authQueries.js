const Response = require("express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const secretKey = "secret-key";
const prisma = new PrismaClient();

async function registerNewUser(data) {
  try {
    if (data.email) {
      console.log(data.email);
      const newUser = await prisma.user.create({
        data: {
          email: data.email,
          password: data.password,
        },
      });
      if (newUser) {
        await prisma.token.create({
          data: {
            accessToken: "",
            userId: newUser.id,
          },
        });
        const token = jwt.sign(
          {
            userId: newUser?.id,
          },
          secretKey,
          {
            expiresIn: "5m",
          }
        );
        return token;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function linkOAuthToUser(data, tokenAccess, serviceId) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data?.email,
      },
    });
    if (!user) {
      console.log("User not found... Creating new user...");
      const newUser = await prisma.user.create({
        data: {
          email: data?.email,
          password: data?.password,
          areas: {},
          token: {},
        },
      });
      if (newUser) {
        await prisma.token.create({
          data: {
            accessToken: tokenAccess,
            userId: newUser?.id,
          },
        });
        const token = jwt.sign(
          {
            userId: newUser?.id,
          },
          secretKey,
          {
            expiresIn: "5m",
          }
        );
        return token;
      }
    } else {
      console.log("User found... Creating new token for user...");
      const serviceToken = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          token: {
            create: {
              accessToken: tokenAccess,
              serviceId: serviceId,
            },
          },
        },
      });
      const token = jwt.sign(
        {
          userId: user?.id,
        },
        secretKey,
        {
          expiresIn: "5m",
        }
      );
      return token;
    }
  } catch (err) {
    console.error(err);
  }
}

async function login(data, res) {
  try {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user?.email == email && user?.password == password) {
      const token = jwt.sign(
        {
          userId: user?.id,
        },
        secretKey,
        {
          expiresIn: "5m",
        }
      );
      console.log(token);
      if (user) {
        const userToken = await prisma.token.findFirst({
          where: {
            userId: user.id,
          },
        });
        const updatedToken = await prisma.token.upsert({
          where: {
            id: userToken?.id,
          },
          update: {
            accessToken: token,
          },
          create: {
            accessToken: token,
            userId: user.id,
          },
        });
        console.log(updatedToken);
      }
      return token;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  registerNewUser,
  linkOAuthToUser,
  login,
};
