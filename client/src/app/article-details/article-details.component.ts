import { Component ,inject,OnInit} from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Post } from '../model/post';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; 

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent implements OnInit {
 category:string;
 articles:Post[]=[];
 filteredArticles:Post[];
 searchTerm:string;
 originalArticles:Post[];
 
 router=inject(ActivatedRoute);
 articleService=inject(ArticlesService);
 userService=inject(UserService);
 route=inject(Router);
 currentUser;
 currentUsername;
 username;
 loginType;
 isUser:boolean=false;
 
 ngOnInit():void{

  // this.userService.getLoginType().subscribe(
  //   (res)=>{
  //     console.log(this.isUser)
  //   this.isUser=res==='user';
    
  //   },
  //   (error)=>{
  //     console.log("error in getting role",error)}
  //     )


  this.category=this.router.snapshot.paramMap.get('category')
    this.fetchArticles();
    this.userService.getLoginType().subscribe({
      next:logintype=>{
        this.loginType = logintype
      },
      error:err=>{
        console.log("Error getting login type ",err)
      }
    })
    this.userService.getCurrentUser().subscribe(
      (res)=>{
        console.log(res)
        this.username=res.username
        this.getUserDetails();
        console.log(this.username)
      },(error)=>{
        console.log("error in reading username",error)
      }
    )

  // this.username=this.router.snapshot.paramMap.get('username');
  // this.userService.getUserByUsername(this.username).subscribe(
  //   (userList)=>{
  //     console.log('userList')
  //   this.currentUser=userList['payload'][0];
  //   this.currentUsername=userList['payload'][0].username;
  //   }
  // )


  // this.router.paramMap.subscribe(param=>{
  //   this.username=param.get('username');
  //   this.getUserDetails();
  // })

  this.articleService.getArticleByCategory(this.category).subscribe(res=>{

      this.originalArticles=res['payload'];
      this.articles=[...res['payload']]
    })
 }

fetchArticles():void{
 this.articleService.getArticleByCategory(this.category).subscribe(
  (res)=>{
    console.log(res)
    this.articles=res['payload'];
    console.log("articles by category : ",this.articles)
  },
  (error)=>{console.log("error fetching articles",error)}
 )
}



 filterBy(nameInput:HTMLInputElement){
  if(nameInput.value){
    const partialName=nameInput.value.toLowerCase();
    this.articles=this.originalArticles.filter(a=>a.title.toLowerCase().includes(partialName));
  }
  else{
    this.articles=[...this.originalArticles]
  }
 }

 getUserDetails(){
  // let username=this.router.snapshot.paramMap.get('username');
  if(this.loginType=='user'){
    this.userService.getUserByUsername(this.username).subscribe(
      (userList)=>{
        console.log('userList is ',userList)
        this.currentUser=userList['payload'][0];
        this.currentUsername=userList['payload'][0].username;
      })
    }
    else{
      this.userService.getAuthorByUsername(this.username).subscribe(
        (userList)=>{
          console.log('AuthorList is ',userList)
          this.currentUser=userList['payload'];
          this.currentUsername=userList['payload'].username;
        })
    }
 }
 

 

 navigateToReadMore(username,category,id):void{
  this.route.navigate([`/read-more/${username}/${category}/${id}`])
 }


}
