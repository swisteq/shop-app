import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_AUTH_TOKEN, LOCAL_STORAGE_AUTH_USER } from '../model/constants';
import { AuthenticationRequest, UserDTO } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  authorizationHeader: string | null = null;
  loggedInUser: UserDTO | null = null;

  loggingIn: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
  }

  hasRole(role: string): boolean {
    return this.loggedInUser != null && this.loggedInUser.roles.includes(role)
  }

  getUserId(): number | null {
    this.refreshAuthentication()
    if (this.loggedInUser != null) {
      return this.loggedInUser.id
    }

    return null
  }

  private refreshAuthentication(): void {
    if (this.authorizationHeader == null) {
      const token = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN)
      if (token != null) {
        this.authorizationHeader = token;
        this.loggedInUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER)!)
      }
    }
  }

  getAuthorizationHeader(): string | null {
    this.refreshAuthentication()
    return this.authorizationHeader
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_AUTH_USER)

    this.authorizationHeader = null
    this.loggedInUser = null
    this.router.navigate([''])
  }

  isLoggedIn(): boolean {
    return (this.getAuthorizationHeader() != null)
  }

  authenticate(request: AuthenticationRequest): void {
    this.loggingIn = true;

    this.httpClient.post<UserDTO>("http://localhost:8080/login", request,
      {
        observe: 'response',
        withCredentials: false
      })
      .subscribe({
        next: (data) => {
          console.log("Success logging in!")
          const authorizationHeader = data.headers.get('Authorization');
          // Bearer:tokenik_tokenik_tokenik
          this.authorizationHeader = authorizationHeader;
          this.loggedInUser = data.body;

          localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, this.authorizationHeader!)
          localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(this.loggedInUser))

          console.log(this.loggedInUser)

          this.loggingIn = false;
          this.router.navigate(['/test'])
        },
        error: (error) => {
          console.log('Error logging in: ')
          console.log(error)
          this.authorizationHeader = null;
          this.loggedInUser = null;

          localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN)
          localStorage.removeItem(LOCAL_STORAGE_AUTH_USER)

          this.loggingIn = false;
        }
      })
  }
}
