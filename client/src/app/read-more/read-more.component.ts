import { Component, inject } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../review.service';
import { Review } from '../model/review';
import { UserService } from '../user.service';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.css'
})

export class ReadMoreComponent {
  articleId: string;
  article: any;
  reviews: Review[] = [];
  rating: number;
  comment: string;
  createdAt:Date;
  //  newReview: Review = { userId: 1, articleNo: 0, rating: 0, comment: '' };
  selectedArticle: any;
  articleService = inject(ArticlesService);
  activatedRoute = inject(ActivatedRoute);
  reviewService = inject(ReviewService);
  userService=inject(UserService)

  isUser:boolean=false;


  ngOnInit(): void {

    this.articleId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchArticleDetails();
    this.fetchReviews();
    this.userService.getLoginType().subscribe(
      (res)=>{
        console.log(this.isUser)
      this.isUser=res==='user';
      
      },
      (error)=>{
        console.log("error in getting role",error)})

  }

  fetchArticleDetails(): void {
    this.articleService.getArticleById(this.articleId).subscribe(
      (article) => {
        console.log(article)
        this.article = article['payload'];
      },
      (error) => {
        console.log("error in fetching article details:", error)
      }
    )
  }

  fetchReviews(): void {
    this.reviewService.getReviewsByArticleId(this.articleId).subscribe(
      (data: any) => {
        console.log(data)
        this.reviews = data['payload'];
      },
      (error: any) => { console.log("error in fecthing reviews", error) }
    )
  }

  submitReview():void{
    //check if rating and comment are provided.
    if(!this.rating ||!this.comment){
      console.log('Rating and comment are required.')
      return;
    }
   let reviewData={
      articleId:this.articleId,
      rating:this.rating,
      comment:this.comment,
      // createdAt:this.createdAt
    }
    console.log(reviewData)

    this.reviewService.createReview(reviewData).subscribe(
      (data:any)=>{
        console.log('Review submitted successfully:',data)
        this.fetchReviews();//refresh reviews after submission
        //reset form fields
        this.rating=null;
        this.comment='';
      },
      (error:any)=>{
        console.log('Error submitting review:',error)
      }
    )
  }

  deleteReview(articleId:string):void{
    this.reviewService.deleteReviewByArticleId(articleId).subscribe(
      (data:any)=>{
        console.log('Review deleted successfully:',data);
        this.fetchReviews();
      },
      (error)=>{
        console.log('Error deleting review:',error);
      }
    )
  }

}