import { Component, input, OnInit, ViewEncapsulation } from '@angular/core';
import { PostModel } from '../PostType';
import { SafeHTMLPipe } from '../SafeHTMLPipe';
import { PostVote } from "../post-vote/post-vote";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-post-tile',
  imports: [SafeHTMLPipe, PostVote, RouterLink],
  templateUrl: './post-tile.html',
  styleUrl: './post-tile.css',
})
export class PostTile{
  posts = input.required<PostModel[]>();
}
