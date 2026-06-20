import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubredditSidebar } from '../subreddit-sidebar/subreddit-sidebar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/shared/auth-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [SubredditSidebar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy{
  isLoggedIn!: boolean;
  destroy$ = new Subject<void>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: data => this.isLoggedIn = data
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToCreatePost() {
    this.router.navigateByUrl("create-post");
  }

  goToCreateSubreddit() {
    this.router.navigateByUrl("create-subreddit");
  }
}
