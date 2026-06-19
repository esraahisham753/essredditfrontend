import { Component } from '@angular/core';
import { PostTile } from '../shared/post-tile/post-tile';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Post } from '../shared/post';
import { Observable } from 'rxjs';
import { PostModel } from '../shared/PostType';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [PostTile, Sidebar, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  posts$: Observable<PostModel[]>;

  constructor(private postsService: Post) {
    this.posts$ = postsService.getPosts();  
  }
}

