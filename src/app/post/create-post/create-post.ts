import { Component, OnInit } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { environment } from '../../../environments/environment.development';
import { Subreddit } from '../../shared/subreddit-sidebar/subreddit';
import { Observable, tap } from 'rxjs';
import { SubredditModel } from '../../shared/subreddit-sidebar/subreddit-model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostPayload } from './postPayload.payload';
import { Post } from '../../shared/post';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [EditorComponent, ReactiveFormsModule, AsyncPipe],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' }
  ],
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.css'],
})
export class CreatePost implements OnInit{
  apiKey = environment.apiKey;
  subreddits$: Observable<Array<SubredditModel>>;
  private postPayload: PostPayload;
  createPostForm!: FormGroup;

  constructor(private subredditService: Subreddit, private postService: Post, private router: Router) {
    this.subreddits$ = subredditService.getSubreddits();
    this.postPayload = {
      postName: '',
      subredditName: '',
      description: '',
      url: ''
    };
  }
  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),  
      description: new FormControl('', Validators.required),
      url: new FormControl('')
    });
  }

  onSubmit() {
    this.postPayload = {
      postName: this.createPostForm.get('postName')?.value,
      subredditName: this.createPostForm.get('subredditName')?.value,
      description: this.createPostForm.get('description')?.value,
      url: this.createPostForm.get('url')?.value 
    };

     this.postService.createPost(this.postPayload)
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: err => console.error(err)
      });
  }

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    base_url: '/tinymce', // Root for resources
    suffix: '.min',
    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
    height: 300,
    menubar: true,
    branding: false
  };
}
