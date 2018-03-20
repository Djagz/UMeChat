var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('./config/mongoose');
var routes = require('./config/routes');
var port = 3000;

routes(app);

app.listen(port);
console.log("Listening on port " + port);




/* contact number to be saved in cookies at the front end
   UserID to be saved in cookies at the front end whenevr a user login
*/
