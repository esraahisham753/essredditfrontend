import { Injectable } from '@angular/core';
import { signupRequestPayload } from '../signup/signup-request.payload';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { loginResponsePayload } from '../login/login-response.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  private usernameSubject: BehaviorSubject<String | null>;
  
  public isLoggedIn$: Observable<boolean>;
  public username$: Observable<String | null>;

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

  getJwtToken(): (String | null) {
    return this.localStorage.retrieve("authenticationToken");
  }

  getUsername(): (String | null) {
    return this.localStorage.retrieve("username");
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
