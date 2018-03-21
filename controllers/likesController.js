var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');


module.exports = {

	hitLikes: function(req, res){

		/*
		input: {either post_id or reply_id or comment_id}
		       {compulsary: user_id}
		       {One user One like for each model(post, comment, reply)}

       output: like or no like

		*/

		var post_id = req.headers.post_id;
		var user_id = req.headers.user_id;
		var comment_id = req.headers.comment_id;
		var reply_id = req.headers.reply_id;

		if(post_id){
			Post.update({'_id': post_id}, {$addToSet: {'likes': user_id}}, function(err, data){
				if(err) {
					res.json(err);
				}

				else{
				res.json(data);
			}
			})
		}

		else if(comment_id){
			Comment.update({'_id': comment_id}, {$addToSet: {'likes': user_id}}, function(err, data){
				if(err) 
					res.json(err);
					res.json(data);
			})
		}

		else{
			Reply.update({'_id': reply_id}, {$addToSet: {'likes': user_id}}, function(err, data){
				if(err) 
					res.json(err);
					res.json(data);
			})
		}
	}
}