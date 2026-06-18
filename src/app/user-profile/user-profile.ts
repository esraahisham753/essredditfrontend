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

  constructor(private commentsService: CommentsService, private authService: AuthService, private postService: Post) {
    const username = authService.getUsername();
    
    if (username) {
      this.comments$ = commentsService.getCommentByUsername(username);
      this.posts$ = postService.getPostsByUsername(username);
    }
  }
}
