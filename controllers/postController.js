var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User')
var ObjectID = require('mongodb').ObjectID
//var otp = mongoose.model('Comment');

module.exports = {
	createPost: function(req, res){
		console.log(req.headers.user_id)
		var post = new Post(req.headers);
		post.save(function(err, data){
			if(err){
				console.log(err);
				res.json(err);
				return
			}

			User.update({'_id': data.user_id}, { $push: {'post_id': data._id}}, function(err, postData){
				if(err){
					res.json(err);
				}
				else{
					res.json({'message': 'post has been saved'});
					console.log(postData);
				}
			})

		})
	},


	deletePost: function(req, res){
		var user_id = req.headers.user_id;
		var post_id = req.headers.post_id;

		if(!post_id){
            	res.json({'message': 'Please enter the post_id'});
            	return;
            }

		Post.deleteOne({'_id': new ObjectID(post_id)}, function(err, postData){
			console.log("postData: ", postData);
			if(err){
				console.log("err 1");
				res.json(err);
				return
			}

			if(postData.n>0){
				User.update({'_id': user_id}, { $pull: {'post_id': post_id} }, function(err, userData){
					console.log("userData: ", userData);
					if(err){
						console.log("err 2");
						res.json(err);
						return
					}
					res.json(userData);
					console.log(userData);
				}); 
			}

			else{
				res.json({'message': 'Please enter the correct post_id'});
			}
			
		});
	},

	readPost: function(req, res){
		/*
		input: Not any input really

		output: 

		3 latest posts
		*/


		Post.find({}).sort({'created_at': -1}).limit(4)
		.populate('comment_id').exec(function(err, data){
			if(err){
				res.json(err);
				return; 
			}

			res.json(data);
		})


	},

	updatePost: function(req, res){
		/*
		input: post_id, description
		output: updated post Yes/No
		*/

		Post.update({'_id': req.headers.id}, req.headers, function(err, data){
			if(err){
				res.json(err);
				return
			}

			res.json(data);
		})
	}
}


