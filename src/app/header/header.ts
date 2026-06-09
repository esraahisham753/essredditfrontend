import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../auth/shared/auth-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [RouterLink],
})
export class Header implements OnInit, OnDestroy {
  isLoggedIn!: boolean;
  username!: String | null;
  destroy$ = new Subject<void>;


  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.isLoggedIn = data);

    this.authService.username$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.username = data);
    
      this.isLoggedIn = this.authService.isLoggedIn();
      this.username = this.authService.getUsername();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
