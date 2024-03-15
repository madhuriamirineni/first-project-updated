import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { ArticlesService } from '../articles.service';
import { Router } from '@angular/router';
import { Post } from '../model/post';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.css'
})
export class AddArticleComponent implements OnInit {
  toast=inject(NgToastService)
  userService=inject(UserService);
  user:string

  articleForm: FormGroup;
  categories = ['fiction', 'novel', 'history'];
  constructor(private fb: FormBuilder, private articleService: ArticlesService, private router: Router) { }

  ngOnInit(): void {

    this.userService.getCurrentUser().subscribe(
      (data)=>{
        this.user=data.username;

      }
      )

    this.articleForm = this.fb.group({
      category: ['', [Validators.required]],
      title: ['', [Validators.required]],
      imageUrl: [''],
      summary: ['', [Validators.required]],
      content: ['', [Validators.required]],
      username: ['', [Validators.required]]

    })
  }
  get title() {
    return this.articleForm.get('title')
  }

  get imageUrl() {
    return this.articleForm.get('image')
  }
  get summary() {
    return this.articleForm.get('summary')
  }

  get content() {
    return this.articleForm.get('content')
  }

  get username() {
    return this.articleForm.get('username')
  }

  file: File;
  fileName: string = "No file selected";

  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;
    }
  }

  onSubmit() {
    //formdata obj preparation
    let formData = new FormData();
    //get article object from NgForm object
    let articleObj = this.articleForm.value;
    //append image to it
    formData.append("imageUrl", this.file);
    //append article object by converting it into string
    formData.append("articleObj", JSON.stringify(articleObj))

    console.log(formData)

    if (this.articleForm.valid) {
      this.articleService.addArticle(formData).subscribe(
        (res) => {
          if (res.message === "Article created") {
            // alert('article saved successfully');
            this.toast.success({
              detail:'Valid form',
              summary:'Article saved successfully.',
              position:'topRight',
              duration:3000
              })

            this.router.navigate(['/user-profile/:username'])
          }
        },
        (error) => {
          console.log('error', error)
          alert('Fill all the fields')
        }
      );
    }
    else {
      // alert('Form is invalid.Please check the fields')
      this.toast.error({
        detail:'Invalid form',
        summary:'Please check the fields.',
        position:'topRight',
        duration:3000
        })
    }
  }

  navigateBack(){
    this.router.navigate([`/user-profile/${this.user}`])
  }
  


}