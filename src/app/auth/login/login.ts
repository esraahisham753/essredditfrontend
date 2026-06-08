import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthService } from '../shared/auth-service';
import { LoginRequestPayload } from './login-request.payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private loginRequestPayload: LoginRequestPayload;
  loginForm!: FormGroup;
  registeredSuccessfulMessage: String;
  isError: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }  

    this.registeredSuccessfulMessage = '';
    this.isError = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params["registered"] !== undefined) {
        this.toastr.success("User registered successfully");
        this.registeredSuccessfulMessage = "Please, check your inbox for the activation email";
      }
    })
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload)
    .subscribe(
      {
        next: data => {
          this.toastr.success("Login successful!");
          this.isError = false;
          this.router.navigateByUrl('');
        },
        error: err => {
          this.isError = true;
          throw(err);
        }
      }
    )
  }
}
