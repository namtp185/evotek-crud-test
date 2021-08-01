const express = require('express');
const app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static('./public'));
app.use(require('./routers/index'));

app.listen(process.env.PORT || 3000, function functionName() {
  console.log("Listening...");
})
