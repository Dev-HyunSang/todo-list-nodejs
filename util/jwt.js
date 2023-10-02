const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const redisClient = require("./redis");
require("dotenv").config()
const secret = process.env.JWT_SECRET;

function signJWT(user) {
    const payload = {
        id: user.id,
        email: user.email
    };

    return jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: '1h'
    });
}

function verifyJWT(token) {
    let decoded = null;
    try {
        decoded = jwt.verify(token, secret);
        return {
            ok: true,
            id: decoded.id,
            email: decoded.email,
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: error.message,
        };
    }
};

function refreshJWT() {
    return jwt.sign({}, secret, {
        algorithm: 'HS256',
        expiresIn: '14d',
    });
};

async function refreshVerifyJWT(token, userID) {
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
        const data = await getAsync(userID);
        if (token === data) {
            try {
                jwt.verify(token, secret);
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    signJWT,
    verifyJWT,
    refreshJWT,
    refreshVerifyJWT
}