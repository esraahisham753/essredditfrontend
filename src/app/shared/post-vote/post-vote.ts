import { Component, input } from '@angular/core';
import { PostModel } from '../PostType';
import { VoteService } from '../vote-service';
import { VoteModel } from '../vote-model';

@Component({
  selector: 'app-post-vote',
  imports: [],
  templateUrl: './post-vote.html',
  styleUrl: './post-vote.css',
})
export class PostVote {
  constructor(private voteService: VoteService) {}

  post = input.required<PostModel>();

  upvote() {
    const voteObj: VoteModel = {
      voteType: 'UPVOTE',
      postId: this.post().postId,
    };

    if (!this.post().upvote) {
      this.post().upvote = true;
      this.post().downvote = false;
      this.post().voteCount++;
    } else {
      this.post().upvote = false;
      this.post().voteCount--;
    }

    this.voteService.vote(voteObj).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
        this.post().upvote = false;
        this.post().voteCount--;
      },
    });
  }

  downvote() {
    const voteObj: VoteModel = {
      voteType: 'DOWNVOTE',
      postId: this.post().postId,
    };

    if (!this.post().downvote) {
      this.post().upvote = false;
      this.post().downvote = true;
      this.post().voteCount--;
    } else {
      this.post().downvote = false;
      this.post().voteCount++;
    }

    this.voteService.vote(voteObj).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
        this.post().upvote = false;
        this.post().voteCount--;
      },
    });
  }
}
