import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-model';
import { Subreddit } from './subreddit';

@Component({
  selector: 'app-subreddit-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './subreddit-sidebar.html',
  styleUrl: './subreddit-sidebar.css',
})
export class SubredditSidebar {
  subreddits$: Observable<Array<SubredditModel>>;
  
  constructor(private subredditService: Subreddit) {
    this.subreddits$ = subredditService.getSubreddits();
  }
}
