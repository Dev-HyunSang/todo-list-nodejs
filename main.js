const express = require('express');
const {sequelize} = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexController = require('./api/index');
app.use("/", indexController)

sequelize.sync({ force: false })
.then(() => {
    console.log("🌱 DataBase connected");
})
.catch((error) => {
    console.error("🔥 Failed DataBase Connection");
    console.error(error);
});

app.listen("3000", () => {
    console.info("🌱 servser started on port 3000 | http://127.0.0.1:3000")
});