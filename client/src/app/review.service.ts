import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from './model/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  http=inject(HttpClient);
  

 
  getReviewsByArticleId(articleId:string): Observable<Review[]> {

    return this.http.get<Review[]>(`http://localhost:4000/review-api/reviews/article/${articleId}`);
  }

  createReview(reviewData: Review): Observable<Review> {
    return this.http.post<Review>(`http://localhost:4000/review-api/reviews`, reviewData);
  }

  updateReview(reviewId:string,UpdatedData){
    return this.http.put<Review>(`http://localhost:4000/review-api/reviews/${reviewId}`,UpdatedData)
  }


  deleteReviewByReviewId(reviewId:string): Observable<any> {
    
    return this.http.delete<any>(`http://localhost:4000/review-api/reviews/${reviewId}`);
  }

}
