var mongoose = require('mongoose');
var user = mongoose.model('User');
var otp = mongoose.model('Otp');
var client = require('twilio')('ACe*********557', '691*********ae9'); //Please use your own Twilio SId and Token


module.exports = {

	sendOTP: function(req, res){
		/*input: contact
		output: sending OTP
		condition: If user already exist
		           Do: Update the OTP
		           If new User
		           Do: Store and send OTP

	        */

	        user.findOne({'contact': req.headers.contact}, function(err, userData){
	        	if(err){
	        		res.json(err);
	        		return;
	        	}
	        	let otp = Math.floor(1000 + Math.random() * 9000);
	        	if(userData){
	        		console.log(userData);
	        		user.update({'contact': userData.contact }, {'otp': otp}, function(err, otpData){
	        			if(err){
			        		res.json(err);
			        		return;
    					}
    					client.messages.create({
							to: '+15105569436',
							from: '+15005550006',
							body: 'Your OTP is:' + otp
						}, function(err, twilioData){
							if(err)
								console.log(err);
								//console.log(twilioData)
						})
						res.json(otpData);
					});
	        	}
	        	else{
				    let newUser = new user({
				    	'country_code': req.headers.country_code,
				    	'contact': req.headers.contact,
				    	'otp': otp
				    });
	        		newUser.save(function(err, data){
	        			if(err){
	        				res.json(err);
	        				return;
	        			}
	        			client.messages.create({
							to: '+15105569436',
							from: '+15005550006',
							body: 'Your OTP is:' + otp
						}, function(err, twilioData){
							if(err)
								console.log(err);
								//console.log(twilioData)
						})
	        			res.json(data);
	        		})
	        	}
	        })
		},

		verifyOTP: function(req, res){
			/* input: contact and otp
			   output: verify 
			*/

			user.findOne({'otp': req.headers.otp, 'contact': req.headers.contact}, function(err, otpData){
				if(err){
					res.json(err);
					return
				}
				if(otpData){
						res.json({'message': 'User Verified'});
						return;
				}
				else{
					res.json({'message': 'Authentication Error'});

				}

			})
		}
	

	}













// app.get('/testTwilio', function(req, res){
// 	client.messages.create({
// 		to: '+15105569436',
// 		from: '+15005550006',
// 		body: 'You have received $25 in your Bank Account as a valued customer. Please find it in your next login'
// 	}, function(err, data){

// 		var contact = {"contact": req.headers.contact};
// 		let otp = {"otp" : Math.floor(1000 + Math.random() * 9000)}
// 		if(err)
// 			console.log(err);
// 		console.log(req.headers.contact);	
// 		OTP_storage.find(contact, function(err, data){
// 		console.log(err, otp);
// 		 if(data.length>0){
// 		 	console.log("if", data, req.headers.contact);
// 		 	OTP_storage.update(contact, otp, {upsert: false}, function(err,data){
// 		 		if(err) {
// 		 			console.log("inside err", err);
// 		 			return
// 		 		}
// 		 		//console.log("inside callback", res.json(data));
// 		 		res.json(data)
// 		 	})
// 		 	//res.json(data)
// 		 }

// 		 else{
// 		 	console.log("else", err);
// 		 	var firstOTP = new OTP_storage({name: req.headers.name, contact: req.headers.contact, otp: Math.floor(1000 + Math.random() * 9000)});

// 		 	firstOTP.save(function(err, data){
// 	     		if(err)
// 		 			console.log(err);	
// 		 			console.log(data);
// 		 			return data;
//  });
//  }
// ///console.log("outside", res.json(data))

// });
// 		//console.log("outside", res.json(data));
// });
// })



// app.post('/verifyUser', function(req, res){	
// 	//console.log(req);
// 	OTP_storage.find({contact: req.headers.contact}, function(err, userData) {
// 		console.log(userData);
// 		if (err) {
// 			res.json(err)
// 		}
// 		else if(userData.length === 0) {
// 			res.json({"message": "your number does not exist in the database"})
// 		}
// 		else {
// 			if(userData[0].otp == req.headers.otp){
// 				console.log("OTP is correct");
// 				res.json(userData);

// 			}
// 			else{
// 				console.log("otp is not correct");
// 			}
// 			// OTP_storage.find({contact: req.headers.contact, otp: req.headers.otp}, function(err, data){
// 			// 	console.log(data);
// 			// 	let otp = Math.floor(1000 + Math.random() * 9000)
// 			// 	data[0].otp = otp;
// 			// 	let temp = data
// 			// 	// console.log(data);
// 			// 	if(err){
// 			// 		res.json(err);
// 			// 	}
// 			// 	else if(data.length>0) {
// 			// 		OTP_storage.update({"contact" : req.headers.contact}, {"otp": otp}, {upsert: false}, function(err,data){
// 			// 	 		if(err) {
// 			// 	 			res.json(err);
// 			// 	 		}
// 		 // 				res.json(temp)
// 		 // 			})
// 			// 	}
// 			// 	else {
// 			// 		res.json({"message": "your OTP is wrong"})
// 			// 	}
// 			// })
// 		}
// 	})
// });