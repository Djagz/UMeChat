var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('mongoose-relationships');
var port = 3000;
var client = require('twilio')('ACeb9671278489e5ccb5df57806a92b557', '69197fda50b2c4d7a856317debabbae9');

mongoose.connect('mongodb://localhost:27017/twilioData');

var schema = new mongoose.Schema({name: 'string', contact: 'number', otp: 'number'});
//schema.add({countryCode: 'string'});
mongoose.model('OTP', schema);
var OTP_storage = mongoose.model('OTP');
//schema.add({date: Date()});
//OTP_storage.prototype.add({countryCode: 'string'});




var val = Math.floor(1000 + Math.random() * 9000);
console.log("Random number is:" + val);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/testTwilio', function(req, res){
	client.messages.create({
		to: '+15105569436',
		from: '+15005550006',
		body: 'You have received $25 in your Bank Account as a valued customer. Please find it in your next login'
	}, function(err, data){

		var contact = {"contact": req.headers.contact};
		let otp = {"otp" : Math.floor(1000 + Math.random() * 9000)}
		if(err)
			console.log(err);
		console.log(req.headers.contact);	
		OTP_storage.find(contact, function(err, data){
		console.log(err, otp);
		 if(data.length>0){
		 	console.log("if", data, req.headers.contact);
		 	OTP_storage.update(contact, otp, {upsert: false}, function(err,data){
		 		if(err) {
		 			console.log("inside err", err);
		 			return
		 		}
		 		//console.log("inside callback", res.json(data));
		 		res.json(data)
		 	})
		 	//res.json(data)
		 }

		 else{
		 	console.log("else", err);
		 	var firstOTP = new OTP_storage({name: req.headers.name, contact: req.headers.contact, otp: Math.floor(1000 + Math.random() * 9000)});

		 	firstOTP.save(function(err, data){
	     		if(err)
		 			console.log(err);	
		 			console.log(data);
		 			return data;
 });
 }
///console.log("outside", res.json(data))

});
		//console.log("outside", res.json(data));
});
})



app.post('/verifyUser', function(req, res){	
	//console.log(req);
	OTP_storage.find({contact: req.headers.contact}, function(err, userData) {
		console.log(userData);
		if (err) {
			res.json(err)
		}
		else if(userData.length === 0) {
			res.json({"message": "your number does not exist in the database"})
		}
		else {
			if(userData[0].otp == req.headers.otp){
				console.log("OTP is correct");
				res.json(userData);

			}
			else{
				console.log("otp is not correct");
			}
			// OTP_storage.find({contact: req.headers.contact, otp: req.headers.otp}, function(err, data){
			// 	console.log(data);
			// 	let otp = Math.floor(1000 + Math.random() * 9000)
			// 	data[0].otp = otp;
			// 	let temp = data
			// 	// console.log(data);
			// 	if(err){
			// 		res.json(err);
			// 	}
			// 	else if(data.length>0) {
			// 		OTP_storage.update({"contact" : req.headers.contact}, {"otp": otp}, {upsert: false}, function(err,data){
			// 	 		if(err) {
			// 	 			res.json(err);
			// 	 		}
		 // 				res.json(temp)
		 // 			})
			// 	}
			// 	else {
			// 		res.json({"message": "your OTP is wrong"})
			// 	}
			// })
		}
	})
});


var Schema = mongoose.Schema;

// Creating post schema with comments ref.
var postSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
	title: 'string',
	description: 'string',
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var commentSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
	description: 'string',
	post: {type: Schema.Types.ObjectId, ref: 'Post'}
});

var Post = mongoose.model('Post', postSchema);
var Comment = mongoose.model('Comment', commentSchema);


var myPost = new Post({
	_id: new mongoose.Types.ObjectId(),
	title: 'My Thej Post',
	description: 'Hey There!',
	comments:[]
});

//var myPostID;

myPost.save(function(err){
		if (err) return handleError(err);
});

var myComment = new Comment({
	_id: new mongoose.Types.ObjectId(),
	description: 'Thej am listening...',
	post: myPost._id
});

myComment.save(function(err, data){
		if (err) return handleError(err);
			Post.update({_id: myPost._id}, {comments: [myComment._id]}, function(err, data){
				if(err) console.log(err);
					console.log(data)
			})
});

console.log(myPost._id)




// // UserSchema stores an Array of ObjectIds for posts 
// var UserSchema = new mongoose.Schema({
//     status: [mongoose.Schema.ObjectId]
// });
 
// // StatusSchema stores an ObjectId for the author 
// var StatusSchema = new mongoose.Schema({
//     title  : String,
//     author : mongoose.Schema.ObjectId
// });
 
// // Attach the plugin 
// UserSchema.hasMany('Status');
// StatusSchema.belongsTo('User', {through: 'author'});

 
// var User = mongoose.model('User', UserSchema);
// var Status = mongoose.model('Status', StatusSchema);


app.listen(port);
console.log("Listening on port " + port);



//5105569436