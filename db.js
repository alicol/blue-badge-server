const Sequelize = require("sequelize");
// const sequelize = new Sequelize("recipe-box", "postgres", "password", {
//   host: "localhost",
//   dialect: "postgres",
// });
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
})

sequelize.authenticate().then(
  function () {
    console.log("Connected to recipe-box postgres database");
  },
  function (err) {
    console.log(err);
  }
);
module.exports = sequelize;