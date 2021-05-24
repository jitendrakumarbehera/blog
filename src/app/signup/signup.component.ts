import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  BlogAPIService } from '../public/blog-api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userSignUp = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    user_email: new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    dob: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  usignUpSubmit  = 0;
  constructor(private backendAPI:BlogAPIService) { }

  ngOnInit(): void {
  }
  signUpSubmit(){
    this.usignUpSubmit = 1;
    // console.log(this.userSignUp)
    if(this.userSignUp.status == 'INVALID'){
      return false;
    }
    const signupData = new FormData();
    signupData.append("Firstname", this.userSignUp.value.first_name);
    signupData.append("Lastname", this.userSignUp.value.last_name);
    signupData.append("Email", this.userSignUp.value.user_email);
    signupData.append("Password", this.userSignUp.value.password);
    signupData.append("DOB", this.userSignUp.value.dob);
    signupData.append("Role", this.userSignUp.value.role);

     this.backendAPI.post('signup',signupData)
    .subscribe((response:any)=>{
       console.log(response)
       if(response.success == 1){
         this.usignUpSubmit = 0;
         this.userSignUp.reset();
         alert(response.message)
       }else{
        alert(response.message)
       }
    },
    (error:any)=>{
      alert('Server connection failed..')
    });
  }
}
