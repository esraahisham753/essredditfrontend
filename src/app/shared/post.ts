import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './PostType';
import { PostPayload } from '../post/create-post/postPayload.payload';

@Injectable({
  providedIn: 'root',
})
export class Post {
  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<Array<PostModel>>{
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/posts');
  }

  createPost(postRequest: PostPayload): Observable<PostModel> {
    return this.httpClient.post<PostModel>('http://localhost:8080/api/posts', postRequest);
  }

  getPostById(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(`http://localhost:8080/api/posts/${id}`);
  }

  getPostsByUsername(username: String): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(`http://localhost:8080/api/user/${username}/posts`);
  }

  getPostsBySubredditName(subredditName: String) : Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(`http://localhost:8080/api/subreddits/${encodeURIComponent(subredditName as string)}/posts`);
  }
}
