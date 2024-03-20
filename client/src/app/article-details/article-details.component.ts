import { Component, inject, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from '../model/article';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  articleService = inject(ArticlesService);
  userService = inject(UserService);
  route = inject(Router);

  category: string;
  articles: Article[] = [];
  searchTerm: string;
  originalArticles: Article[];
  username: string;
  isUser: boolean = false;
  searchQuery: string = '';
  
  ngOnInit(): void {

    this.category = this.activatedRoute.snapshot.paramMap.get('category')
    this.username = this.activatedRoute.snapshot.paramMap.get('username')

    this.fetchArticles();

    this.articleService.getArticleByCategory(this.category).subscribe(res => {
      this.originalArticles = res['payload'];
      this.articles = [...res['payload']]
    })
  }

  fetchArticles(): void {
    this.articleService.getArticleByCategory(this.category).subscribe({
      next: (res) => {
        this.articles = res['payload'];
      },
      error: (error) => { console.log("error fetching articles", error) }
    })
  }

  filterArticles() {
    if (this.searchQuery) {
      const partialName = this.searchQuery.toLowerCase();
      this.articles = this.originalArticles.filter(a => a.title.toLowerCase().includes(partialName));
    }
    else {
      this.articles = [...this.originalArticles]
    }
  }

  navigateToReadMore(id: any): void {
    this.route.navigate([`/read-more/${this.username}/${this.category}/${id}`])
  }

}
