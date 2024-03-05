import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './model/post';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<any> {
    return this.http.get(`http://localhost:4000/article-api/articles`)
  }

  getArticleByCategory(category:string): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:4000/article-api/article/category/${category}`)
  }
  
  getArticleById(id:string):Observable<any>{
    return this.http.get(`http://localhost:4000/article-api/article/${id}`)
  }

  addArticle(formData: any): Observable<any> {

    return this.http.post('http://localhost:4000/article-api/article', formData);
  }
}

