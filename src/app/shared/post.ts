import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './PostType';

@Injectable({
  providedIn: 'root',
})
export class Post {
  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<Array<PostModel>>{
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/posts');
  }
}
