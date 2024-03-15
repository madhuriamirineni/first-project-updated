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
  articleId: string;
  article: any;
  reviews: Review[] = [];
  reviewId;
  rating: number;
  comment: string;
  createdAt:Date;
  //  newReview: Review = { userId: 1, articleNo: 0, rating: 0, comment: '' };
  selectedArticle: any;
  articleService = inject(ArticlesService);
  activatedRoute = inject(ActivatedRoute);
  reviewService = inject(ReviewService);
  userService=inject(UserService)
  showUpdate=false;
  showSubmit=true;

  isUser:boolean=false;
  fb: FormBuilder = inject(FormBuilder);
  reviewForm=this.fb.group({
    rating: ['', [Validators.required]],
    comment: ['', Validators.required]
  })


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
   let reviewData={
      articleId:this.articleId,
      rating:Number(this.reviewForm.value.rating),
      comment:this.reviewForm.value.comment,
      // createdAt:this.createdAt
    }
    console.log(reviewData)

    this.reviewService.createReview(reviewData).subscribe(
      (data:any)=>{
        console.log('Review submitted successfully:',data)
        this.fetchReviews();//refresh reviews after submission
        //reset form fields
        this.reviewForm.reset({rating:null,comment:null})
      },
      (error:any)=>{
        console.log('Error submitting review:',error)
      }
    )
  }

  deleteReview(reviewId:string):void{
    this.reviewService.deleteReviewByReviewId(reviewId).subscribe(
      (data:any)=>{
        console.log('Review deleted successfully:',data);
        this.fetchReviews();
      },
      (error)=>{
        console.log('Error deleting review:',error);
      }
    )
  }

  //to set the form values for editing
  editReview(review){
    this.showSubmit=false
    this.showUpdate=true
    console.log("review is ",review)
    this.reviewId = review._id
    this.reviewForm.controls['comment'].setValue(review.comment)
    this.reviewForm.controls['rating'].setValue(review.rating)
    // this.reviewForm.reset({rating:null,comment:null})
  }

  updateReview(){
    this.showSubmit=true
    this.showUpdate=false
    let updateddata = {comment:this.reviewForm.value.comment,rating:this.reviewForm.value.rating}
    this.reviewService.updateReview(this.reviewId,updateddata).subscribe(
      (data:any)=>{
        console.log('Review updated successfully: ',data);
        this.fetchReviews();
        this.reviewForm.reset({rating:null,comment:null})
      },
      (error)=>{
        console.log('Error in updating review: ',error)
      }
    )
  }

}