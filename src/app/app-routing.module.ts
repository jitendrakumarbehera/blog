import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './public/auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BlogaddeditComponent } from './blogaddedit/blogaddedit.component';

const routes: Routes = [
                    {path:'',component:HomepageComponent},
                    {path:'signup',component:SignupComponent},
                    {path:'login',component:LoginComponent},
                    {path:'add_blog',canActivate:[AuthGuard],component:BlogaddeditComponent}
                  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
