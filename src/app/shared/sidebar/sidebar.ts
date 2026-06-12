import { Component } from '@angular/core';
import { SubredditSidebar } from '../subreddit-sidebar/subreddit-sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [SubredditSidebar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {}
