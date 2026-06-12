import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PostModel } from '../PostType';
import { Post } from '../post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-tile',
  imports: [AsyncPipe],
  templateUrl: './post-tile.html',
  styleUrl: './post-tile.css',
})
export class PostTile {
  posts$: Observable<Array<PostModel>>;

  constructor(private postService: Post) {
    this.posts$ = postService.getPosts();
  }
}
