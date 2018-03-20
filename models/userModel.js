var mongoose = require('mongoose');
require('mongoose-relationships');

var Schema = mongoose.Schema;

var userSchema = Schema({
    name: {type: String},
    country_code: {type: String, required: true},
    contact: {type: Number, required: true},
    isActive: Boolean,
    otp: Number,
    post_id: [{ type: Schema.Types.ObjectId, ref: 'Post' }],   //One User to Many Posts

});

mongoose.model('User', userSchema);