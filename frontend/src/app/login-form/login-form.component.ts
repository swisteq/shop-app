import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
import { AuthenticationRequest } from '../model/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  notification: string | any = null;
  // loggingIn: boolean = false;

  authenticationRequest: AuthenticationRequest = {
    login: '',
    pass: ''
  }

  constructor(
    protected authService: AuthenticationServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.authenticate(this.authenticationRequest);
  }

  clearForm(): void {
    this.authenticationRequest = {
      login: '',
      pass: ''
    }
  }
}

