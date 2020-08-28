require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");


let user = require("./controllers/usercontroller");
let recipe = require("./controllers/recipecontroller");

sequelize.sync();
//sequelize.sync({force: true})
app.use(require("./middleware/headers"));
app.use(express.json());

//have endpoint of journal/practice
//send a response from that endpoint (this is a practice route)

app.use("/user", user);
app.use('/recipe', recipe);

app.listen(process.env.PORT, function () {
  console.log("App is listening on port 3000");
});