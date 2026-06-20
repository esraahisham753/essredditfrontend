import { Inject, Injectable } from '@angular/core';
import { signupRequestPayload } from '../signup/signup-request.payload';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { loginResponsePayload } from '../login/login-response.payload';
import { RefreshTokenRequestPayload } from './refresh-token.payload';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  private usernameSubject: BehaviorSubject<String | null>;
  private toastr = Inject(ToastrService);
  
  public isLoggedIn$: Observable<boolean>;
  public username$: Observable<String | null>;

  private refreshTokenRequestPayload!: RefreshTokenRequestPayload;

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.usernameSubject = new BehaviorSubject<String | null>(this.getUsername());
    this.isLoggedIn$ = this.loggedInSubject.asObservable();
    this.username$ = this.usernameSubject.asObservable();
  }

  signup(signupRequestPayload: signupRequestPayload) : Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/auth/signup", signupRequestPayload, {responseType: "text"});
  }

  login(loginRequestPayload: LoginRequestPayload) : Observable<boolean> {
    return this.httpClient.post<loginResponsePayload>(
      'http://localhost:8080/api/auth/login',
      loginRequestPayload,
    )
    .pipe(map(data => {
      this.localStorage.store("authenticationToken", data.authenticationToken);
      this.localStorage.store("username", data.username);
      this.localStorage.store("refreshToken", data.refreshToken);
      this.localStorage.store("expiresAt", data.expiresAt);

      this.loggedInSubject.next(true);
      this.usernameSubject.next(data.username);
      
      return true;
    }));
  }

  refreshToken(): Observable<loginResponsePayload> {
    const refreshTokenRequestPayload: RefreshTokenRequestPayload = {
      username: this.getUsername(),
      refreshToken: this.getRefreshToken()
    };

    return this.httpClient.post<loginResponsePayload>(
      'http://localhost:8080/api/auth/refresh/token',
      refreshTokenRequestPayload
    )
    .pipe(tap(loginResponsePayload => {
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('expiresAt');
      this.localStorage.store('authenticationToken', loginResponsePayload.authenticationToken);
      this.localStorage.store('expiresAt', loginResponsePayload.expiresAt);
    }));
  }

  getJwtToken(): (String | null) {
    return this.localStorage.retrieve("authenticationToken");
  }

  getUsername(): (String | null) {
    return this.localStorage.retrieve("username");
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getRefreshToken(): String {
    return this.localStorage.retrieve("refreshToken");
  }

  logout() : void {
    const logoutPayload: RefreshTokenRequestPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }

    this.httpClient.post<String>("http://localhost:8080/api/auth/logout", logoutPayload)
    .subscribe({
      next: data => console.log(data),
      error: err => this.toastr.error("Something went wrong during logout, try again later.", err)
    });

    this.localStorage.clear("authenticationtoken");
    this.localStorage.clear("expiresat");
    this.localStorage.clear("refreshtoken");
    this.localStorage.clear("username");
  }
}
