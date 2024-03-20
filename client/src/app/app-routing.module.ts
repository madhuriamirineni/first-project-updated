import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },{
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'user-profile/:username',
    component:UserProfileComponent,
    // canActivate:[authGuard]
  },
  {
    path:'article-details/:username/:category',
    component:ArticleDetailsComponent,
    canActivate:[authGuard]
  },
  {
    path:'read-more/:username/:category/:id',
    component:ReadMoreComponent,
    canActivate:[authGuard]
  },
  {
    path:'add-article',
    component:AddArticleComponent,
    canActivate:[authGuard]

  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'

  },
  {
    path:"**",
    component:ErrorComponent

  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
