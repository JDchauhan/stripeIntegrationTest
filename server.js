var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.set("view engine", "ejs")

var routes = require('./api/routes/appRoutes');
routes(app);


app.listen(port);


console.log('server started on: ' + port);