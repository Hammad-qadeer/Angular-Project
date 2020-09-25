import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Post } from '../services/post';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPosts(): Observable<Post> {
    return this.http
      .get<Post>(this.url + '/posts')
      .pipe(retry(1), catchError(this.handleError));
  }

  getPost(id): Observable<Post> {
    return this.http
      .get<Post>(this.url + '/posts/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create employee
  createPost(post): Observable<Post> {
    return this.http
      .post<Post>(this.url + '/posts', JSON.stringify(post), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updatePost(id, post): Observable<Post> {
    return this.http
      .put<Post>(
        this.url + '/posts/' + id,
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deletePost(id) {
    return this.http
      .delete<Post>(this.url + '/posts/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
