import { Component, input, OnInit } from '@angular/core';
import { CommentsService } from './comments-service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
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
  comments$ = new BehaviorSubject<CommentModel[]>([]);
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
    this.commentsService.getCommentByPost(this.post().postId)
    .subscribe({
      next: data => this.comments$.next(data),
      error: err => console.error(err)
    });

    this.createCommentForm = new FormGroup({
      text: new FormControl('', Validators.required),
    });
  }

  submitComment() {
    this.commentPayload = {
      text: this.createCommentForm.get('text')?.value,
      postId: this.post().postId
    };

    const previous: CommentModel[] = this.comments$.getValue();
    this.comments$.next([...previous, this.mapCommentPayloadToCommentModel(this.commentPayload)]);
    this.createCommentForm.reset();

    this.commentsService.createComment(this.commentPayload).subscribe({
      next: data => console.log(data),
      error: err => {
        console.error(err);
        const previous = this.comments$.getValue();
        this.comments$.next(previous.filter(comment => comment !== this.mapCommentPayloadToCommentModel(this.commentPayload) ));
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
