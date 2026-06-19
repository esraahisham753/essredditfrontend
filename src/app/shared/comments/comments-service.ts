import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from './comment-model';
import { CommentPayload } from './CommentModel.payload';
import { CommentDto } from './comment-dto';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  getCommentByPost(postId: number): Observable<Array<CommentModel>> {
    return this.httpClient.get<Array<CommentModel>>(`http://localhost:8080/api/posts/${postId}/comments`);
  }

  createComment(commentPayload: CommentPayload) : Observable<CommentDto>{
    return this.httpClient.post<CommentDto>('http://localhost:8080/api/comments', commentPayload);
  }

  getCommentByUsername(username: String): Observable<CommentModel[]> {
    return this.httpClient.get<CommentModel[]>(`http://localhost:8080/api/user/${username}/comments`);
  }
}
