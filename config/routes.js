var userController = require('../controllers/userController');
var postController = require('../controllers/postController');
var commentController = require('../controllers/commentController');
//var otpController = require('../controllers/otpController');
var replyController = require('../controllers/replyController');
var likesController = require('../controllers/likesController');

var path = require('path');
// var fs = require('fs')

// var controllers_path = path.join(__dirname, '../controllers');

// fs.readdirSync(controllers_path).forEach(function(file){
// 	if(file.indexOf('.js') >= 0){
// 		var file = require(path.join(controllers_path, file))
// 	}
// })

module.exports = function(app) {

	//app.post('/signUp', userController.signUp);
	app.post('/verifyOTP', userController.verifyOTP);
	app.post('/sendOTP', userController.sendOTP);
	//app.post('/login', userController.login);
	app.post('/createPost', postController.createPost);
	app.post('/deletePost', postController.deletePost);
	app.post('/readPost', postController.readPost);
	app.post('/updatePost', postController.updatePost);
	app.post('/createComment', commentController.createComment);
	//app.post('/createReply', commentController.createReply);
	app.post('/createObject', commentController.createObject);
	app.post('/addnewcolumn', commentController.updateNewCommentColomn);
	app.post('/createReply', replyController.createReply);
	app.put('/hitLikes', likesController.hitLikes);


	app.all("*", (req, res, next) => {
		res.sendFile(path.resolve("./UMeChat/dist/index.html"))
	});


}