import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  BlogAPIService } from '../public/blog-api.service';
@Component({
  selector: 'app-blogaddedit',
  templateUrl: './blogaddedit.component.html',
  styleUrls: ['./blogaddedit.component.css']
})
export class BlogaddeditComponent implements OnInit {
  userBlog = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    Description:new FormControl('', [Validators.required]),
    Status:new FormControl('', [Validators.required]),
  });
  blogSubmit  = 0;
  userType = ''
  blogUrl = '';
  userId = '';
  blogData = [];

  editUrl = ''
  blogedit = 0;
  blogId = '';
  constructor(private backendAPI:BlogAPIService) { }

  ngOnInit(): void {
    this.userType = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('user_id');
    this.getBlog()
  }
  createBlog(){
    this.blogSubmit = 1;
    // console.log(this.userSignUp)
    if(this.userBlog.status == 'INVALID'){
      return false;
    }
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day =  date.getDate();
    const blogData = new FormData();
    blogData.append("user_id", this.userId);
    blogData.append("Title", this.userBlog.value.Title);
    blogData.append("Description", this.userBlog.value.Description);
    blogData.append("Date", year+'-'+month+'-'+day);
    blogData.append("Status", this.userBlog.value.Status);

     this.backendAPI.post('create_blog',blogData)
    .subscribe((response:any)=>{
       console.log(response)
       if(response.success == 1){
         this.blogSubmit = 0;
         this.userBlog.reset();
         this.getBlog()
         alert(response.message)
       }else{
        alert(response.message)
       }
    },
    (error:any)=>{
      alert('Server connection failed..')
    });
  }
  getBlog(){

    if(this.userType == 'admin'){
      this.blogUrl = 'blog'
    }else{
      this.blogUrl = 'blog?user_id='+this.userId;
    }

    this.backendAPI.get(this.blogUrl)
    .subscribe((response:any)=>{
       console.log(response)
       if(response.data){
        this.blogData = response.data;
       }
    },
    (error:any)=>{
      alert('Server connection failed..')
    });
  }
  deleteBlog(id){
    const blogData = new FormData();
    blogData.append("id", id);

     this.backendAPI.post('blog_delete',blogData)
    .subscribe((response:any)=>{
       console.log(response)
       if(response.success == 1){
         
         alert(response.message)
       }else{
        alert(response.message)
       }
    },
    (error:any)=>{
      alert('Server connection failed..')
    });
  }
  editBlog(id){
    this.blogId = id;
    this.editUrl = 'blog?id='+this.blogId;
    this.blogedit = 1;
    this.backendAPI.get(this.editUrl)
    .subscribe((response:any)=>{
       if(response.data.length != 0){
        this.userBlog.patchValue({
          Title: response.data[0].Title,
          Description:response.data[0].Description,
          Status:response.data[0].Status,
        })
       }
       
    },
    (error:any)=>{
      alert('Server connection failed..')
    });
  }
  updateBlog(blogId){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day =  date.getDate();
    const blogData = new FormData();
    blogData.append("blog_id", this.blogId);
    blogData.append("Title", this.userBlog.value.Title);
    blogData.append("Description", this.userBlog.value.Description);
    blogData.append("Date", year+'-'+month+'-'+day);
    blogData.append("Status", this.userBlog.value.Status);

     this.backendAPI.post('update_blog',blogData)
    .subscribe((response:any)=>{
       console.log(response)
       if(response.success == 1){
         this.blogSubmit = 0;
         this.userBlog.reset();
         alert(response.message);
         this.getBlog()
       }else{
        alert(response.message)
       }
    },
    (error:any)=>{
      alert('Server connection failed..')
    });
  }
}
