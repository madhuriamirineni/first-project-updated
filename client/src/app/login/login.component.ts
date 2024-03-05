import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userCredentialsError = {
    userCredErrStatus: false,
    userCredErrMsg: ""
  }
  get username() {
    return this.userCredentials.get('username')
  }
  get password() {
    return this.userCredentials.get('password')
  }

  userService = inject(UserService)
  router = inject(Router)

  fb: FormBuilder = inject(FormBuilder);

  userCredentials = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
    password: ['', Validators.required]
  })



  onSubmitUser() {
    this.userService.userLogin(this.userCredentials.value).subscribe(
      (res) => {
        console.log(res)
        console.log(res.message)
        if (res.message === 'login success') {
          //store token in local/session storage
          localStorage.setItem('token', res.token)
          //set user status and current user to service
          this.userService.setUserLoginStatus(true)
          this.userService.setCurrentUser(res.user)
          console.log(res.user.username)
          //navigate to user profile
          this.router.navigate([`/user-profile/${res.user.username}`])
        }
        else {
          this.userCredentialsError = {
            userCredErrStatus: true,
            userCredErrMsg: res.message
          }
        }
      }, (error) => {
        console.log('err in user login', error)
      }
    )

  }
}
