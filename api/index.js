const express = require('express');
const router = express.Router();

// const todoController = require('./controllers/todolistController');
const authController = require('./controllers/auth');

function authJWT(req, res, next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split("Bearer")[1];
    }
}

// router.use('/todos', todoController);
router.use('/auth', authController);

module.exports = router;
