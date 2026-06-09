import { ChangeDetectorRef, Component, DOCUMENT, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/shared/auth-service';
import { Subject, takeUntil } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [RouterLink],
})
export class Header implements OnInit, OnDestroy {
  isLoggedIn!: boolean;
  username!: String | null;
  destroy$ = new Subject<void>();
  dropdownOpen: boolean;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platform_id: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.dropdownOpen = false;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  private outsideClickListener = (event: MouseEvent): void => {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.isLoggedIn = data));

    this.authService.username$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.username = data));

    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();

    if (isPlatformBrowser(this.platform_id)) {
      this.document.addEventListener('click', this.outsideClickListener);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (isPlatformBrowser(this.platform_id)) {
      this.document.removeEventListener('click', this.outsideClickListener);
    }
  }
}
