import { Injectable } from '@angular/core';
import { VoteModel } from './vote-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private httpClient: HttpClient) {}

  vote(voteObj: VoteModel): Observable<VoteModel> {
    return this.httpClient.post<VoteModel>('http://localhost:8080/api/votes', voteObj);
  } 
}
