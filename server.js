var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('./config/mongoose');
var routes = require('./config/routes');
var path = require('path');
var port = 3000;



app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/UMeChat/dist')));    //dist folder is the compressed folder with all the client side pages sent to the client


routes(app);

app.listen(port);
console.log("Listening on port " + port);




/* contact number to be saved in cookies at the front end
   UserID to be saved in cookies at the front end whenevr a user login
*/
