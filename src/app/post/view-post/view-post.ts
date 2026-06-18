import { Component, input } from '@angular/core';
import { PostModel } from '../../shared/PostType';

@Component({
  selector: 'app-view-post',
  imports: [],
  templateUrl: './view-post.html',
  styleUrl: './view-post.css',
})
export class ViewPost {
  post = input.required<PostModel>();
}
