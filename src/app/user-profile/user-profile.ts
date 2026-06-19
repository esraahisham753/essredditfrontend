import { Component, input, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from '../shared/comments/comment-model';
import { CommentsService } from '../shared/comments/comments-service';
import { PostModel } from '../shared/PostType';
import { Post } from '../shared/post';
import { AsyncPipe } from '@angular/common';
import { PostTile } from '../shared/post-tile/post-tile';
import { RouterLink } from '@angular/router';

type ProfileTab = 'posts' | 'comments';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe, PostTile, RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  comments$!: Observable<CommentModel[]>;
  posts$!: Observable<PostModel[]>;
  username = input.required<String>();
  activeTab = signal<ProfileTab>('posts');

  constructor(
    private commentsService: CommentsService,
    private postService: Post,
  ) {}

  ngOnInit(): void {
    this.comments$ = this.commentsService.getCommentByUsername(this.username());
    this.posts$ = this.postService.getPostsByUsername(this.username());
  }

  setTab(tab: ProfileTab) : void{
    this.activeTab.set(tab);
  }
}
