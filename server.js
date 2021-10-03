const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require("cors");
const routes = require('./routers/index');
const userRoute = require("./routers/user");
const connectDB = require("./dbConnector");
const seedData = require("./dbSeeder");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();
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
app.use(routes);
app.use('/users', userRoute);

const errorHandler = require("./routers/errorHandler");
app.use(errorHandler);

app.listen(process.env.PORT || 3000, function functionName() {
  console.log("Listening...");
});
