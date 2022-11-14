import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateUserRequest } from '../model/user';
import { UserServiceService } from '../user-service/user-service.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  @ViewChild('ref') child: ElementRef|any;

  createUserRequest: CreateUserRequest;
  sendingUser: boolean = false;
  notification: string | any = null;

  constructor(
    private renderer: Renderer2,
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router) {

    this.createUserRequest = this.userService.getDefautUserRequest()
  }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.sendingUser = true;
    this.userService.registerUser(this.createUserRequest)
      .subscribe({
        next: (value) => {
          this.sendingUser = false;
          this.snackBar.open('User has been added', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'start',
            duration: 5000
          })

          // po dodaniu obiektu przekieruj na listę
          this.router.navigate(['/login'])
          console.log(value)
        },
        error: (error: any) => {
          this.sendingUser = false;
          this.notification = error.message

          setTimeout(() => {
            this.renderer.addClass(this.child.nativeElement, 'hidden');
            setTimeout(() => {
              // po 1 sekundzie wyczyść powiadomienie o błędzie
              this.notification = null;
            }, 1000)
          }, 3000)
        },
      }
      )
  }

  clearForm(): void {
    this.createUserRequest = this.userService.getDefautUserRequest()
  }
}
