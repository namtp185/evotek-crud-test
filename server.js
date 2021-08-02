const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static('./public'));
app.use(require('./routers/index'));
app.use('/users', require("./api/user.controller"));

app.listen(process.env.PORT || 3000, function functionName() {
  console.log("Listening...");
});
