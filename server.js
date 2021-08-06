const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectDB = require("./dbConnector");
connectDB();
const seedData = require("./dbSeeder");
seedData()
  .then((res) => {
    console.log("Database create successfully!");
  })
  .catch((err) => {
    console.log("Some database seeding error happened!");
    console.log(err);
  });

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static('./public'));
app.use(require('./routers/index'));
app.use('/users', require("./api/user.controller"));

const errorHandler = require("./routers/errorHandler");
app.use(errorHandler);

app.listen(process.env.PORT || 3000, function functionName() {
  console.log("Listening...");
});
