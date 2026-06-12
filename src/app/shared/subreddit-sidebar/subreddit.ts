import { Injectable } from '@angular/core';
import { SubredditModel } from './subreddit-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Subreddit {

  constructor(private httpClient: HttpClient) {
  }

  getSubreddits(): Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>('http://localhost:8080/api/subreddits');
  }
}
