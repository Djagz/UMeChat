var mongoose = require('mongoose');
//require('mongoose-relationships');

var Schema = mongoose.Schema;

var replySchema = Schema({
  reply: {type: String, required: true},
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  comment_id: { type: Schema.Types.ObjectId, required: true, ref: 'Comment' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date }  
})

mongoose.model('Reply', replySchema);
