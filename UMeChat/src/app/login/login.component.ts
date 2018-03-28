import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private my_service: MyServiceService) {}

  formSelector = true;

  _otp: Number;

  fullContact = {
  	my_contact: Number,
  	countryCode: ""
  }

  ngOnInit() {
  }

  sendContact(){
  	console.log("Send OTP", this.fullContact);

  	this.my_service.sendContact_getOTP(this.fullContact, navigate => {
  		console.log("Happy to navigate");
  		this.my_service.setMyContact(this.fullContact.my_contact);
  		this.formSelector = false;
  	},

  	fail => {
  		console.log("Didn't get the required data");

  	})

  }

  resendOTP(){

  	console.log("I am in resendOTP")

  	this.my_service.resend_otp({my_contact: this.my_service.getMyContact()}, navigate => {
  		console.log("OTP Resent");
  	},

  	fail => {
  		console.log("Didn't get the required data OTP Resent");
  	})

  }

  verify_OTP(){
  	console.log("OTP verification", this._otp);
  	console.log("Contact number is: ", this.my_service.getMyContact());

  	this.my_service.getOTP_verifyOTP(this._otp, navigate => {
  		console.log("Happy to navigate for verifyOTP");
  	},

  	fail => {
  		console.log("Didn't get the required data for verifyOTP");

  	})

  }

}
