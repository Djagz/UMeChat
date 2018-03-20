var mongoose = require('mongoose');
require('mongoose-relationships');

var Schema = mongoose.Schema;

var postSchema = Schema({
	description: {type: String, required: true},
	user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },         //One Post to One User  - creator
	likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],        //One Post to Many Likes - people who liked the post
	comment_id: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], //One Post to Many Comments
	created_at: { type: Date, required: true, default: Date.now },
	updated_at: { type: Date }	  
});

mongoose.model('Post', postSchema);



