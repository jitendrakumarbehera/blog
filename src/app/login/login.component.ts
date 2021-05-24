import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  BlogAPIService } from '../public/blog-api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin = new FormGroup({
    user_name: new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required]),
  });
  uloginSubmit  = 0;
  constructor(private backendAPI:BlogAPIService,private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    this.uloginSubmit = 1;
    
    if(this.userLogin.status == 'INVALID'){
      return false;
    }
    const loginData = new FormData();
    loginData.append("Email", this.userLogin.value.user_name);
    loginData.append("Password", this.userLogin.value.password);
    this.backendAPI.post('login',loginData)
    .subscribe((response:any)=>{
      if(response.success ==1){
        sessionStorage.setItem('token',this.userLogin.value.user_name)
        sessionStorage.setItem('role',response.data[0].Role);
        sessionStorage.setItem('user_id',response.data[0].id);
        this.router.navigate(['/add_blog']);
      }else{
        alert(response.message)
      }
    },
    (error:any)=>{
      alert('Server connection failed..')
    });
    
  }
}
