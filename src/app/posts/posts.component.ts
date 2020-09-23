import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'https://gorest.co.in/public-api/posts';
  constructor(private http: HttpClient) {
    http.get(this.url).subscribe((response) => {
      this.posts = JSON.parse(JSON.stringify(response)).data;
    });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';

    this.http.post(this.url, JSON.stringify(post)).subscribe((response) => {
      post['id'] = JSON.parse(JSON.stringify(response)).id;
      this.posts.splice(0, 0, post);
      console.log(response);
    });
  }

  updatePost(post) {
    this.http
      .patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
      .subscribe((response) => {
        console.log(JSON.stringify(response));
      });
  }

  deletePost(post) {
    this.http.delete(this.url + '/' + post.id).subscribe((response) => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
  }

  ngOnInit(): void {}
}
