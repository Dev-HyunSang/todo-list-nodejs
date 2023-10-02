const express = require('express');
const router = express.Router();
const { v4: uuidv4} = require('uuid');

// Security + Crpyto
const crypto = require('crypto');
const jwt = require('../../util/jwt');
const redisClient = require('../../util/redis');
const util = require("util");

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

// DB
const db = require('../../models');
const User = db.user;

var date = new Date();

async function createSalt() {
    const buf = await randomBytesPromise(64);

    return buf.toString('base64');
}

async function createHashedPassword(password) {
    const salt = await createSalt();
    const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
    const hashedPassword = key.toString("base64");

    return {
        hashedPassword,
        salt
    }
}

async function verifyPassword(password, userSalt, userPassword){
    const key = await pbkdf2Promise(password, userSalt, 104906, 64, "sha512");
    const hashedPw = key.toString("base64");

    if (hashedPw === userPassword) {
        return true
    } else {
        return false
    }
}

router.post('/join', async function (req, res, next) {
    try {
        let {email, password, nickname } = req.body;
        let hashedPw = await createHashedPassword(password);

        let user_data = {
            user_id: uuidv4(),
            user_email: email,
            user_password: hashedPw.hashedPassword,
            user_salt: hashedPw.salt,
            user_nickname: nickname,
        }

        const user = await User.create(user_data).catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json('Failed to join Handler');
    }
});

router.post("/login", async function(req, res, next) {
    try {
        let {email, password} = req.body;
        let isSuccess;
        const user = await User.findOne( {
            where: {
                user_email: email
            },
            raw: true
        }).catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });

        console.log(user);

        let isVerifyPw = await verifyPassword(password, user.user_salt, user.user_password);
        if (!isVerifyPw) {
            res.status(400).json("Failed to verify Password");
        }

        isSuccess = true
        if (isSuccess) {
            const accessToken = jwt.signJWT(user);
            const refreshToken = jwt.refreshJWT();

            await redisClient.connect();

            // String으로 넣지 않으면 Redis에 넣어지지 않음. 항상 꼭 String으로 Input할 것.
            redisClient.set(String(user.user_id), String(refreshToken));

            res.status(200).json({
                status: 200,
                message: "환영해요!",
                data: {
                    accessToken,
                    refreshToken
                },
                responsed_at: date
            })

        } else if (!isSuccess){
            res.status(500).json({
                status: 500,
                data: {
                    message: "failed to jwt"
                },
                responsed_at: date
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Failed to Login Handler");
    }
});

module.exports = router;