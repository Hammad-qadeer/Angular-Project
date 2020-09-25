import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  Post: any = [];
  constructor(public service: PostService) {}

  ngOnInit() {
    this.loadpost();
  }

  // Get employees list
  loadpost() {
    return this.service.getPosts().subscribe((data: {}) => {
      this.Post = data;
    });
  }

  deletePost(id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.service.deletePost(id).subscribe((data) => {
        this.loadpost();
      });
    }
  }
}
