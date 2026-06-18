import { Component, input, OnInit } from '@angular/core';
import { PostModel } from '../../shared/PostType';
import { RouterLink } from '@angular/router';
import { SafeHTMLPipe } from '../../shared/SafeHTMLPipe';
import { PostVote } from '../../shared/post-vote/post-vote';
import { Comments } from '../../shared/comments/comments';
import { Observable } from 'rxjs';
import { Post } from '../../shared/post';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-view-post',
  imports: [RouterLink, SafeHTMLPipe, PostVote, Comments, AsyncPipe],
  templateUrl: './view-post.html',
  styleUrl: './view-post.css',
})
export class ViewPost implements OnInit{
  id = input.required<number>();

  post$!: Observable<PostModel>;

  constructor(private postService: Post) {
  }

  ngOnInit(): void {
    this.post$ = this.postService.getPostById(this.id());
  }


}
