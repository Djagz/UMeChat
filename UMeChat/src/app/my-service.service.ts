import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MyServiceService {

  constructor(private _http: Http) { }

   private my_contact;


   getMyContact(){
   	return this.my_contact;
   }

   setMyContact(contact_set){
   	this.my_contact = contact_set;
   }

  sendContact_getOTP(contact, navigate, fail) {
  	console.log("I am contact: ", contact);

  	this._http.post('/sendOTP', contact).subscribe(

  		(res) => {
  			if(res.json()){		
  				navigate()
  				console.log("Able to get data and travel to the next page");
  			}
  			else{
  				fail()
  				console.log("did not get the required data(otpinfo)");
  			}
  		},

  		(error) => {
  			console.log("Could not connect to the backend");
  		}



  		)

  }


  resend_otp(new_contact, navigate, fail){

  	this._http.post('/sendOTP', new_contact).subscribe(

  		(res) => {
  			if(res.json()){		
  				navigate()
  				console.log("Able to resend the OTP");
  			}
  			else{
  				fail()
  				console.log("did not get the required data(resendOTP)");
  			}
  		},

  		(error) => {
  			console.log("Could not connect to the backend");
  		}


  }



  getOTP_verifyOTP(otp, navigate, fail){

  	let otp_contact = {
  		_otp: otp,
  		contact: this.my_contact
  	}

  	this._http.post('/verifyOTP', otp_contact).subscribe(

  		(res) => {
  			console.log(res.json());
  			if(res.json().message){
  				navigate()
  				console.log("Able to get OTP and travel to the next page");
  			}

  			else{
  				fail()
  				console.log("did not get the required data(verifyOTP)");
  			}
  		},

  		(error) => {
  			console.log("Could not connect to the backend");
  		}
  		)
  	}



  }





}
