import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  @Input() postDetails = { name: '', email: '', phone: 0 };

  constructor(private service: PostService, public router: Router) {}

  ngOnInit() {}

  addPost() {
    this.service.createPost(this.postDetails).subscribe((data: {}) => {
      this.router.navigate(['/post-list']);
    });
  }
}
