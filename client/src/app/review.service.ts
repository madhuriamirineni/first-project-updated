import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from './model/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  http=inject(HttpClient);
  // private apiUrl= `http://localhost:4000/reviews`;

  //fetch reviews by articleNo
  getReviewsByArticleId(articleId:string): Observable<Review[]> {
    // const url = `http://localhost:4000/reviews/article/${articleId}`;
    return this.http.get<Review[]>(`http://localhost:4000/review-api/reviews/article/${articleId}`);
  }
  //create a new review
  createReview(reviewData: Review): Observable<Review> {
    return this.http.post<Review>(`http://localhost:4000/review-api/reviews`, reviewData);
  }


  deleteReviewByArticleId(articleId:string): Observable<any> {
    // const url = `${this.apiUrl}/${reviewId}`;
    return this.http.delete<any>(`http://localhost:4000/review-api/reviews/article/${articleId}`);
  }

}
