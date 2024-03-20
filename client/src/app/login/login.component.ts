import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fb: FormBuilder = inject(FormBuilder);
  userService = inject(UserService);
  toast = inject(NgToastService);
  router = inject(Router);

  userCredentialsError = {
    userCredErrStatus: false,
    userCredErrMsg: ""
  }

  userCredentials = this.fb.group({
    loginType: [''],
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
    password: ['', Validators.required]
  })

  get username() {
    return this.userCredentials.get('username')
  }
  get password() {
    return this.userCredentials.get('password')
  }

  onSubmitUser() {
    const formData = this.userCredentials.value;
    if (formData.loginType === 'user') {
      this.userService.userLogin(this.userCredentials.value).subscribe({
        next: (res) => {
          if (res.message === 'login success') {
            this.toast.success({
              detail: 'Valid form',
              summary: 'LoggedIn Successfully.',
              position: 'topRight',
              duration: 3000
            })

            localStorage.setItem('token', res.token);

            this.userService.setUserLoginStatus(true);
            this.userService.setCurrentUser(res.user);
            this.userService.setLoginType(formData.loginType);

            this.router.navigate([`/user-profile/${res.user.username}`]);
          }
          else {
            this.userCredentialsError = {
              userCredErrStatus: true,
              userCredErrMsg: res.message
            }
          }
        }, error: (error) => {
          console.log('err in user login', error);
        }
      })
    }

    else {

      this.userService.authorLogin(this.userCredentials.value).subscribe({
        next: (res) => {
          if (res.message === 'login success') {

            this.toast.success({
              detail: 'Valid form',
              summary: 'LoggedIn Successfully.',
              position: 'topCenter',
              duration: 3000
            })

            localStorage.setItem('token', res.token)

            this.userService.setUserLoginStatus(true)
            this.userService.setCurrentUser(res.author)
            this.userService.setLoginType(formData.loginType)

            this.router.navigate([`/user-profile/${res.author.username}`])

          }
        },
        error: (error) => {
          console.log('err in author login', error)
        }
      })
    }

  }
}






