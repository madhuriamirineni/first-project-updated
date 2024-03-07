// import { Component,OnInit,inject} from '@angular/core';
// import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
// import {Router} from '@angular/router';
// import { UserService } from '../user.service';
// import { User } from '../model/user';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent{
 
//  //getter and setter methods
//  get username(){
//   return this.user.get('username')
// }
// get password(){
//   return this.user.get('password')
// }
// get email(){
//   return this.user.get('email')
// }
// get dob(){
//   return this.user.get('dob')
// }


// duplicateUserStatus:boolean=false;
// userService=inject(UserService);
// fb:FormBuilder=inject(FormBuilder);
// router=inject(Router)
// user=this.fb.group({
//   username:['',[Validators.required,Validators.minLength(4),Validators.maxLength(6)]],
//   password:['',Validators.required],
//   email:['',Validators.required],
//   dob:['',Validators.required]

// })

// onSubmitUser(){
//   let {username,password,email,dob}=this.user.value;
//   let newUser=new User(username,password,email,dob);
//   this.userService.createUser(newUser).subscribe(
//     (res)=>{
      
//       //navigate to login
//       if(res.message==="User created"){
//         console.log(res)
//         this.router.navigate(['/login'])
//       }
//       else{
//         this.duplicateUserStatus=true;
//       }
      
//     },(error)=>{
//       console.log('error in user creation',error)
//     }
//   )

// } 
// }

import { Component,inject } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../model/user';
import {Author} from '../model/author';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

//getter and setter methods
  get username(){
    return this.registerForm.get('username')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get email(){
    return this.registerForm.get('email')
  }
  get dob(){
    return this.registerForm.get('dob')
  }

  duplicateUserStatus:boolean=false;
  duplicateAuthorStatus:boolean=false;
  router=inject(Router)
  userService=inject(UserService);
  registerForm:FormGroup;
  fb:FormBuilder=inject(FormBuilder);

  ngOnInit(){
    this.registerForm=this.fb.group({
      registerType:'user',
      username:['',[Validators.required,Validators.minLength(4),Validators.maxLength(6)]],
      password:['',Validators.required],
      email:['',Validators.required],
      dob:['']
  
    })
  }
 
  
  onSubmit(){
    if(this.registerForm.valid){
      const formData=this.registerForm.value;
      if(formData.registerType==='user'){
        let {username,password,email,dob}=this.registerForm.value;
        let newUser=new User(username,password,email,dob);
        this.userService.createUser(newUser).subscribe(
          (res)=>{
            
            //navigate to login
            if(res.message==="User created"){
              console.log(res)
              this.router.navigate(['/login'])
            }
            else{
              this.duplicateUserStatus=true;
            }
            
          },(error)=>{
            console.log('error in user creation',error)
          }
        )
    
      }
      else if(formData.registerType==='author'){
        let {username,password,email}=this.registerForm.value;
        let newAuthor=new Author(username,password,email);
        console.log(newAuthor)
        this.userService.createAuthor(newAuthor).subscribe(
          (res)=>{
            //navigate to login
            if(res.message==="Author created"){
              console.log(res)
              this.router.navigate(['/login'])
            }
            else{
              this.duplicateAuthorStatus=true;
            }
            
          },(error)=>{
            console.log('error in author creation',error)
          }
        )
      }
      else{
        console.log('form is invalid')
      }
    }
    
  }
 

 }


