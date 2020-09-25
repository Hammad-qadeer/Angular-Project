import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  postData: any = {};
  constructor(
    public service: PostService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.service.getPost(this.id).subscribe((data: {}) => {
      this.postData = data;
    });
  }

  updatePost() {
    if (window.confirm('Are you sure, you want to update?')) {
      this.service.updatePost(this.id, this.postData).subscribe((data) => {
        this.router.navigate(['/post-list']);
      });
    }
  }
}
