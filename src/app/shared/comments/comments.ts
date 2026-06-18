import { Component, input, OnInit } from '@angular/core';
import { CommentsService } from './comments-service';
import { Observable, switchMap } from 'rxjs';
import { CommentModel } from './comment-model';
import { AsyncPipe } from '@angular/common';
import { PostModel } from '../PostType';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentPayload } from './CommentModel.payload';
import { AuthService } from '../../auth/shared/auth-service';

@Component({
  selector: 'app-comments',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments implements OnInit {
  comments$!: Observable<Array<CommentModel>>;
  post = input.required<PostModel>();
  createCommentForm!: FormGroup;
  loggedIn: boolean;
  commentPayload: CommentPayload;

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
  ) {
    this.loggedIn = authService.isLoggedIn();
    this.commentPayload = {
      text: '',
      postId: 0
    };
  }

  ngOnInit(): void {
    this.comments$ = this.commentsService.getCommentByPost(this.post().postId);

    this.createCommentForm = new FormGroup({
      text: new FormControl('', Validators.required),
    });
  }

  submitComment() {
    this.commentPayload = {
      text: this.createCommentForm.get('text')?.value,
      postId: this.post().postId
    };

    this.comments$.pipe(
      switchMap((comments) => [...comments, this.mapCommentPayloadToCommentModel(this.commentPayload)]),
    );

    this.commentsService.createComment(this.commentPayload).subscribe({
      next: data => console.log(data),
      error: err => {
        console.error(err);
        this.comments$.pipe(
          switchMap(comments => {
            const commentId = this.mapCommentPayloadToCommentModel(this.commentPayload).id;
            
            return comments.filter(comment => comment.id !== commentId);
          })
        )
      }
    });
  }

  mapCommentPayloadToCommentModel(commentPayload: CommentPayload): CommentModel {
    return {
      postId: commentPayload.postId,
      username: this.authService.getUsername(),
      text: commentPayload.text,
      duration: 'moments ago',
    };
  }
}
