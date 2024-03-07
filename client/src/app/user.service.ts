import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './model/user';
import { Author } from './model/author';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  httpClient = inject(HttpClient);
  userLoginStatus = new BehaviorSubject<boolean>(false)
  currentUser = new BehaviorSubject<User>({
    username: '',
    password: '',
    email: '',
    dob: ''
  })

//   authorLoginStatus=new BehaviorSubject<boolean>(false);
//  currentAuthor=new BehaviorSubject<Author>({
//   username:'',
//   password:'',
//   email:''
//  })

 loginType = new BehaviorSubject<string>("")
 setLoginType(type):any{
   this.loginType.next(type);
 }

 getLoginType(){
   return this.loginType.asObservable();
 }

  setUserLoginStatus(value: boolean) {
    this.userLoginStatus.next(value)
  }
  getUserLoginStatus() {
    return this.userLoginStatus.asObservable()
  }

  // setAuthorLoginStatus(value:boolean){
  //   this.authorLoginStatus.next(value)
  //  }
  //  getAuthorLoginStatus() {
  //   return this.authorLoginStatus.asObservable()
  // }

  setCurrentUser(user: User) {
    this.currentUser.next(user)
  }
  getCurrentUser() {
    return this.currentUser.asObservable()
  }

  // setCurrentAuthor(author: Author) {
  //   this.currentAuthor.next(author)
  // }
  // getCurrentAuthor() {
  //   return this.currentAuthor.asObservable()
  // }

  //create user(User registration)
  createUser(newUser: User): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user', newUser)
  }

  createAuthor(newAuthor: Author): Observable<any> {
    return this.httpClient.post('http://localhost:4000/author-api/author', newAuthor)
  }

  userLogin(userCredObj): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user-login',userCredObj)
  }
  authorLogin(authorCredObj): Observable<any> {
    return this.httpClient.post('http://localhost:4000/author-api/login',authorCredObj)
  }
  //get user by username
  getUserByUsername(username): Observable<any> {
    return this.httpClient.get(`http://localhost:4000/user-api/user/${username}`)
  }

  //get user by username
  getAuthorByUsername(username): Observable<any> {
    return this.httpClient.get(`http://localhost:4000/author-api/author/${username}`)
  }

  getUserById(id): Observable<any> {
    return this.httpClient.get(`http://localhost:4000/user-api/users?id=${id}`)
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/users/${id}`, userData)
  }


  //user logout

  userLogout() {
     //reset current user
     this.setUserLoginStatus(false)
    //  this.setAuthorLoginStatus(false)
     //reset login status
     this.setCurrentUser({
       username:'',
       password:'',
       email:'',
       dob:''
     })
    //  this.setCurrentAuthor({
    //   username:'',
    //   password:'',
    //   email:''
    //  }

    //  )
     //remove token from local storage
     localStorage.removeItem('token')
  }

  //updateUserDetails
  updateUserDetails(updatedUser: any): Observable<any> {
    return this.httpClient.put('http://localhost:3000/users', updatedUser);
  }
}


