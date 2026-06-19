import { Component, input, OnInit } from '@angular/core';
import { PostModel } from '../PostType';
import { SafeHTMLPipe } from '../SafeHTMLPipe';
import { PostVote } from "../post-vote/post-vote";

@Component({
  selector: 'app-post-tile',
  imports: [SafeHTMLPipe, PostVote],
  templateUrl: './post-tile.html',
  styleUrl: './post-tile.css',
})
export class PostTile{
  posts = input.required<PostModel[]>();
}
