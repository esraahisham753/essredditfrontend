import { Component, input } from '@angular/core';
import { PostModel } from '../../shared/PostType';

@Component({
  selector: 'app-view-subreddit',
  imports: [],
  templateUrl: './view-subreddit.html',
  styleUrl: './view-subreddit.css',
})
export class ViewSubreddit {
  posts = input.required<PostModel[]>();
}
