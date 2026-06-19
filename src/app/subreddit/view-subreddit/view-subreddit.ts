import { Component, input, OnInit } from '@angular/core';
import { PostModel } from '../../shared/PostType';
import { Observable } from 'rxjs';
import { Post } from '../../shared/post';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-view-subreddit',
  imports: [AsyncPipe],
  templateUrl: './view-subreddit.html',
  styleUrl: './view-subreddit.css',
})
export class ViewSubreddit implements OnInit{
  posts$!: Observable<PostModel[]>;
  name = input.required<String>();

  constructor(private postsService: Post) {
    
  }

  ngOnInit(): void {
    if (this.name()) {
      this.posts$ = this.postsService.getPostsBySubredditName(this.name());
    }
  }
}
