import { Component, inject } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../review.service';
import { Review } from '../model/review';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.css'
})

export class ReadMoreComponent {

  articleService = inject(ArticlesService);
  activatedRoute = inject(ActivatedRoute);
  reviewService = inject(ReviewService);
  userService = inject(UserService);

  articleId: string;
  article: any;
  reviews: Review[] = [];
  reviewId: any;
  rating: number;
  comment: string;
  createdAt: Date;
  showUpdate = false;
  showSubmit = true;
  isUser: boolean = false;

  fb: FormBuilder = inject(FormBuilder);
  reviewForm = this.fb.group({
    rating: ['', [Validators.required]],
    comment: ['', Validators.required]
  })


  ngOnInit(): void {

    this.articleId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchArticleDetails();
    this.fetchReviews();
    this.userService.getLoginType().subscribe({
      next: (res) => {
        this.isUser = res === 'user';
      },
      error: (error) => {
        console.log("error in getting role", error)
      }
    })
  }

  fetchArticleDetails(): void {
    this.articleService.getArticleById(this.articleId).subscribe({
      next: (article) => {
        this.article = article['payload'];
      },
      error: (error) => {
        console.log("error in fetching article details:", error)
      }
    })
   }

  fetchReviews(): void {
    this.reviewService.getReviewsByArticleId(this.articleId).subscribe({
      next: (data: any) => {
        this.reviews = data['payload'];
      },
      error: (error: any) => { console.log("error in fecthing reviews", error) }
    })
  }

  submitReview(): void {
    let reviewData = {
      articleId: this.articleId,
      rating: Number(this.reviewForm.value.rating),
      comment: this.reviewForm.value.comment,
      createdAt: this.createdAt
    }

    this.reviewService.createReview(reviewData).subscribe({
      next: (data: any) => {
        this.fetchReviews();
        this.reviewForm.reset({ rating: null, comment: null })
      },
      error: (error: any) => {
        console.log('Error submitting review:', error)
      }
    })
  }

  deleteReview(reviewId: string): void {
    this.reviewService.deleteReviewByReviewId(reviewId).subscribe({
      next: (data: any) => {
        this.fetchReviews();
      },
      error: (error) => {
        console.log('Error deleting review:', error);
      }
    })
  }

  editReview(review:any):void {
    this.showSubmit = false
    this.showUpdate = true
    this.reviewId = review._id
    this.reviewForm.controls['comment'].setValue(review.comment)
    this.reviewForm.controls['rating'].setValue(review.rating)
  }

  updateReview():void {
    this.showSubmit = true
    this.showUpdate = false
    let updatedData = {
      comment: this.reviewForm.value.comment,
      rating: this.reviewForm.value.rating,
      createdAt: this.createdAt
    }
    this.reviewService.updateReview(this.reviewId, updatedData).subscribe({
      next: (data: any) => {
        this.fetchReviews();
        this.reviewForm.reset({ rating: null, comment: null })
      },
      error: (error) => {
        console.log('Error in updating review: ', error)
      }
    })
  }

}