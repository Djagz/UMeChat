var mongoose = require('mongoose');
require('mongoose-relationships');

var Schema = mongoose.Schema;

var otpSchema = Schema({
    otp: Number
});

mongoose.model('Otp', otpSchema);