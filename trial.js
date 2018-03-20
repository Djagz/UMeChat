signUp: function(req, res){
		if(!req.headers.contact){
			res.json({'message': 'Put The Contact Please'});
			return
		}
		user.find({"contact": req.headers.contact}, function(err, data) {
			if (err){
				res.json(err)
				return
			}
			if (data.length > 0) {
				let randomOTP = Math.floor(1000 + Math.random() * 9000);
				otp.update({"_id" : data[0].otpID}, {"otp": randomOTP}, function(err, data) {
					if(err)
						res.json(err)
					data["message"] = "otp has been changed"
					res.json(data)
				})

			}
			else {
				let randomOTP = Math.floor(1000 + Math.random() * 9000);
				let newOtp = new otp({"otp": randomOTP});
				newOtp.save(function(err, data) {
					if(err) {
						res.json(err)
						return
					}
					let newUser = new user(req.headers)
					newUser["isActive"] = true;   //By Default: false
					newUser["otpID"] = data._id
					newUser.save(function(err, data) {
						if(err) {
							res.json(err)
							return
						}
						client.messages.create({
							to: '+15105569436',
							from: '+15005550006',
							body: 'Your OTP is:' + randomOTP
						}, function(err, twilioData){
							if(err)
								console.log(err);
								//console.log(twilioData)
						})
						res.json(data)
					})
				})
			}
		})
	},

	verifyUser: function(req, res){
		user.find({contact: req.headers.contact}).populate('otpID').exec(function(err, userData) {
			if (err) {
				res.json(err)
			}
			else if(userData.length === 0) {
				res.json({"message": "your number does not exist in the database"})
			}
			else {
				console.log(userData[0].otpID.otp);
				res.json(userData[0].otpID.otp);
				client.messages.create({
					to: '+15105569436',
					from: '+15005550006',
					body: 'Your OTP is: ' + userData[0].otpID.otp 
				}, function(err, twilioData){
					if(err)
						console.log(err);
				})
			}
		})	
	},

	login: function(req, res){
		if(!req.headers.contact || !req.headers.otp){
			console.log("Please send the phone number and otp when calling this API");
			res.json({'message': 'Error Occurred'});
			return;
		}
		user.find({contact: req.headers.contact}).populate('otpID').exec(function(err, userData){
			if(err){
				res.json(err);
				return;
			}
			if(userData.length === 0){
				console.log("Number does not exist");
				res.json({'message': 'Number is wrong'});
				return;
			}
			if(userData[0].otpID.otp == req.headers.otp){
				res.json(userData);
			}
			else{
				res.json({'message': 'Wrong OTP'});
			}
		})
	}
}