import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PostModel } from '../shared/PostType';
import { Post } from '../shared/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home{
  posts$: Observable<Array<PostModel>>;

  constructor(private postService: Post) {
    this.posts$ = postService.getPosts();
  }

}
