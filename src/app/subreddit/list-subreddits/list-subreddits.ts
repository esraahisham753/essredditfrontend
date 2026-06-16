import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { SubredditModel } from '../../shared/subreddit-sidebar/subreddit-model';
import { Subreddit } from '../../shared/subreddit-sidebar/subreddit';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-list-subreddits',
  imports: [CommonModule, RouterLink, Sidebar],
  templateUrl: './list-subreddits.html',
  styleUrl: './list-subreddits.css',
})
export class ListSubreddits {
  subreddits$: Observable<Array<SubredditModel>>;
  
  constructor(private subredditService: Subreddit) {
    this.subreddits$ = subredditService.getSubreddits();
  }
}
