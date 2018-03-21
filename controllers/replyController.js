var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');



module.exports = {

	createReply: function(req, res){
		/*
		input: reply(description), user_id, comment_id
		output: reply 
		*/

		Reply.create(req.headers, function(err, data){
			if(err){
				res.json(err);
				return;
			}

			Comment.update({'_id': req.headers.comment_id}, {$push: {'reply_id': data._id}}, function(err, commentData){
				if(err){
				res.json(err);
				return;
				}
				res.json(commentData);

			});
		});
	}
}