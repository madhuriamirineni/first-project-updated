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
  setUserLoginStatus(value: boolean) {
    this.userLoginStatus.next(value)
  }
  getUserLoginStatus() {
    return this.userLoginStatus.asObservable()
  }

  currentUser = new BehaviorSubject<User>({
    username: '',
    password: '',
    email: '',
    dob: ''
  })
  setCurrentUser(user: User) {
    this.currentUser.next(user)
  }
  getCurrentUser() {
    return this.currentUser.asObservable()
  }

  loginType = new BehaviorSubject<string>("")
  setLoginType(type): any {
    this.loginType.next(type);
  }
  getLoginType() {
    return this.loginType.asObservable();
  }


  createUser(newUser: User): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user', newUser)
  }

  createAuthor(newAuthor: Author): Observable<any> {
    return this.httpClient.post('http://localhost:4000/author-api/author', newAuthor)
  }

  userLogin(userCredObj): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user-login', userCredObj)
  }
  authorLogin(authorCredObj): Observable<any> {
    return this.httpClient.post('http://localhost:4000/author-api/login', authorCredObj)
  }

}


