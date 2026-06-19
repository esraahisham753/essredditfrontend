import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from '../shared/comments/comment-model';
import { CommentsService } from '../shared/comments/comments-service';
import { AuthService } from '../auth/shared/auth-service';
import { PostModel } from '../shared/PostType';
import { Post } from '../shared/post';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  comments$!: Observable<CommentModel[]>;
  posts$!: Observable<PostModel[]>;
  username: String | null;

  constructor(private commentsService: CommentsService, private authService: AuthService, private postService: Post) {
    this.username = authService.getUsername();
    
    if (this.username) {
      this.comments$ = commentsService.getCommentByUsername(this.username);
      this.posts$ = postService.getPostsByUsername(this.username);
    }
  }
}
