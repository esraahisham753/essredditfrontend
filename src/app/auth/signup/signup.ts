import { Component, OnInit } from '@angular/core';
import { signupRequestPayload } from './signup-request.payload';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth-service';
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  private signupRequestPayload: signupRequestPayload;
  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  public signup(): void {
    this.signupRequestPayload.email = this.signupForm.get("email")?.value;
    this.signupRequestPayload.username = this.signupForm.get("username")?.value;
    this.signupRequestPayload.password = this.signupForm.get("password")?.value;

    this.authService.signup(this.signupRequestPayload)
    .subscribe({
      next: data => {
        this.router.navigate(
          ['/login'],
          {
            queryParams: { registered: true }
          }
        )
      },
      error: err => {
        console.error(err);
        this.toastr.error('Registeration failed! Please, try again.');
      }
    });
  };
  
}
