import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Author } from '../model/author';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  get username() {
    return this.registerForm.get('username')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get dob() {
    return this.registerForm.get('dob')
  }

  duplicateUserStatus: boolean = false;
  duplicateAuthorStatus: boolean = false;
  router = inject(Router)
  userService = inject(UserService);
  toast = inject(NgToastService)
  registerForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);

  ngOnInit() {
    this.registerForm = this.fb.group({
      registerType: 'user',
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@(gmail\.com|email\.com)$/)]],
      dob: ['']

    })
  }


  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      if (formData.registerType === 'user') {
        let { username, password, email, dob } = this.registerForm.value;
        let newUser = new User(username, password, email, dob);
        this.userService.createUser(newUser).subscribe({
          next: (res) => {

            if (res.message === "User created") {

              this.toast.success({
                detail: 'Valid form',
                summary: ' User Registered Successfully.',
                position: 'topRight',
                duration: 3000
              })

              this.router.navigate(['/login'])
            }
            else {
              this.duplicateUserStatus = true;
            } },
          error: (error) => {
            console.log('error in user creation', error)
          }
        })
      }

      else if (formData.registerType === 'author') {
        let { username, password, email } = this.registerForm.value;
        let newAuthor = new Author(username, password, email);
        this.userService.createAuthor(newAuthor).subscribe({
          next: (res) => {

            if (res.message === "Author created") {

              this.toast.success({
                detail: 'Valid form',
                summary: 'Author Registered Successfully.',
                position: 'topRight',
                duration: 3000
              })

              this.router.navigate(['/login'])
            }
            else {
              this.duplicateAuthorStatus = true;
            }
          },
          error: (error) => {
            console.log('error in author creation', error)
          }
        })
      }

      else {
        this.toast.error({
          detail: 'Invalid form',
          summary: 'Please check the fields.',
          position: 'topRight',
          duration: 3000
        })
      }
    }
  }
}


