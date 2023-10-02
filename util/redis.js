const redis = require("redis");
require('dotenv').config();

const client = redis.createClient({
    legacyMode: false
});

module.exports = client;