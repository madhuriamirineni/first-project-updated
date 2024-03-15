import { Component,inject,OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userService=inject(UserService)
 status:boolean;
 isUser:boolean=false;
 ngOnInit():void{

  this.userService.getLoginType().subscribe(
    (res)=>{
      console.log(this.isUser)
    this.isUser=res==='user';
    
    },
    (error)=>{
      console.log("error in getting role",error)
    }
        
      )
  
 this.userService.getUserLoginStatus().subscribe({
  next:(userLoginStatus)=>this.status=userLoginStatus
 })
//  this.userService.getAuthorLoginStatus().subscribe({
//   next:(authorLoginStatus)=>{this.status=authorLoginStatus}
//  })
 }
}
