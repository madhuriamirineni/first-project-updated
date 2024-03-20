import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Article } from '../model/article';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  router = inject(Router);

  currentUser: any;
  currentUsername: string;
  currentEmail: string;
  articles: Article[];

  ngOnInit(): void {

    this.userService.getCurrentUser().subscribe({
      next: (userList) => {
        this.currentUser = userList;
        this.currentUsername = userList.username;
        this.currentEmail = userList.email;
      },
      error: (error) => { console.log(error) }
    });
  }

  navigateToArticleDetails(username: string, category: string): void {
    this.router.navigate([`/article-details/${username}/${category}`]);
  }
}
