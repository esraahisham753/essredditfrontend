import { Component } from '@angular/core';
import { SubredditSidebar } from '../subreddit-sidebar/subreddit-sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [SubredditSidebar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private router: Router) {}

  goToCreatePost() {
    this.router.navigateByUrl("create-post");
  }

  goToCreateSubreddit() {
    this.router.navigateByUrl("create-subreddit");
  }
}
