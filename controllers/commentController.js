var mongoose = require('mongoose');
//var lib = require('mongoose-relationships');
var Post = mongoose.model('Post');
//var User = mongoose.model('User')
var Comment = mongoose.model('Comment');
//var Reply = mongoose.model('Reply');

module.exports = {

	
	createComment: function(req, res){
		// let newComment = new Comment(req.headers);
		Comment.create(req.headers, function(err, data){
			if(err){
				res.json(err);
				return;
			}
			Post.update({'_id': req.headers.post_id}, {$push: {'comment_id': data._id}}, (err, postData)=>{
				if(err){
					res.json(err);
					return;
				}

				res.json(postData);
			})
		})
	},

	updateNewCommentColomn: function(req,res){
		console.log("hi")
		Comment.update({},{$set : {"remarks": "Good"}}, {upsert: false, multi:true}, (err,data) => {
			console.log("Data", data)
			if(err) {
				res.json(err)
			}
			else{
				res.json(data)
			}
		})
	},

	/*createReply: function(req, res){
		Comment.find({'_id': req.headers.id }, function(err, replyData){
	        if(err){
				res.json(err);
				return;
			}
			Reply.create({
				'title' : req.headers.title,
				'author' : replyData._id
			}, (err, data) => {
				if(err){
					res.json(err)
					return
				}
				console.log(data)
				replyData.replies = [data]
				console.log(replyData)
				replyData.save((err,data)=>{
					if(err){
						res.json(err)
						return
					}
					res.json(data)
				})
			})
		})
	},*/


createObject: function(req, res){
// 	if(lib){
// 	console.log(lib)
// }

	var comment = new Comment();

	comment.replies.create([
    { title: "Not too imaginative post title" }
  , { title: "... a tad more imaginative post title" }
], function(err, comment, replies){
	if(err){
		res.json(err);
		return;
	}
  // user.posts.length === 3 
  // posts.length == 2 
  // posts[0] instanceof Post 
});
}

}