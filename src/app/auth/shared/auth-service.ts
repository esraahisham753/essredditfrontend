import { Injectable } from '@angular/core';
import { signupRequestPayload } from '../signup/signup-request.payload';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signup(signupRequestPayload: signupRequestPayload) : Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/auth/signup", signupRequestPayload, {responseType: "text"});
  }
}
