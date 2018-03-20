var mongoose = require('mongoose');
//require('mongoose-relationships');

var Schema = mongoose.Schema;

var commentSchema = Schema({

  comment: {type: String, required: true},
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  post_id: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  reply_id: [{type: Schema.Types.ObjectId, ref: 'Reply'}],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date }    
});

mongoose.model('Comment', commentSchema);




 













































// // UserSchema stores an Array of ObjectIds for posts 
// var commentSchema = new mongoose.Schema({
// 	description: String,
// 	title: String,
// 	remarks: String,
//     replies: [mongoose.Schema.ObjectId]
// });
 
// // PostSchema stores an ObjectId for the author 
// var replySchema = new mongoose.Schema({
//     title  : String,
//    author : mongoose.Schema.ObjectId
// });
 
// // Attach the plugin 
// commentSchema.hasMany('Reply');
// replySchema.belongsTo('Comment', {through: 'author'});
 
// var Comment = mongoose.model('Comment', commentSchema)
//   , Reply = mongoose.model('Reply', replySchema);






  /*
  var mongoose = require('mongoose');
require('mongoose-relationships');
 
// UserSchema stores an Array of ObjectIds for posts 
var UserSchema = new mongoose.Schema({
    posts: [mongoose.Schema.ObjectId]
});
 
// PostSchema stores an ObjectId for the author 
var PostSchema = new mongoose.Schema({
    title  : String
  , author : mongoose.Schema.ObjectId
});
 
// Attach the plugin 
UserSchema.hasMany('Post');
PostSchema.belongsTo('User', {through: 'author'});
 
var User = mongoose.model('User', UserSchema)
  , Post = mongoose.model('Post', PostSchema);
  */