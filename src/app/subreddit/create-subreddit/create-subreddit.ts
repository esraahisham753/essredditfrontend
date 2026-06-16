import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubredditModel } from '../../shared/subreddit-sidebar/subreddit-model';
import { Subreddit } from '../../shared/subreddit-sidebar/subreddit';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-create-subreddit',
  imports: [ReactiveFormsModule],
  templateUrl: './create-subreddit.html',
  styleUrl: './create-subreddit.css',
})
export class CreateSubreddit implements OnInit{
  subredditForm!: FormGroup;
  private subredditPayload: SubredditModel;

  constructor(private subredditService: Subreddit, private router: Router) {
    this.subredditPayload = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
    this.subredditForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
      }
    )
  }

  onSubmit() {
    this.subredditPayload.name = this.subredditForm.get('name')?.value;
    this.subredditPayload.description = this.subredditForm.get('description')?.value;

    this.subredditService.postSubreddit(this.subredditPayload)
    .subscribe({
      next: data => this.router.navigateByUrl('subreddits'),
      error: (err) => throwError(() => err)
    });
    
  }

  onDiscard() {
    this.router.navigateByUrl('/');
  }
}
