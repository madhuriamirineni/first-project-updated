import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './model/user'


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

  setUserLoginStatus(value: boolean) {
    this.userLoginStatus.next(value)
  }
  getUserLoginStatus() {
    return this.userLoginStatus.asObservable()
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user)
  }
  getCurrentUser() {
    return this.currentUser.asObservable()
  }

  //create user(User registration)
  createUser(newUser: User): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user', newUser)
  }

  //user login
  // userLogin(userCredObj): Observable<any> {
  //   return this.httpClient.get(`http://localhost:3000/users?username=${userCredObj.username}`)
  // }
  userLogin(userCredObj): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user-login',userCredObj)
  }
  //get user by username
  getUserByUsername(username): Observable<any> {
    return this.httpClient.get(`http://localhost:4000/user-api/user/${username}`)
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
     //reset login status
     this.setCurrentUser({
       username:'',
       password:'',
       email:'',
       dob:''
     })
     //remove token from local storage
     localStorage.removeItem('token')
  }

  //updateUserDetails
  updateUserDetails(updatedUser: any): Observable<any> {
    return this.httpClient.put('http://localhost:3000/users', updatedUser);
  }
}


