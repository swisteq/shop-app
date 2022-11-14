import { Component } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-with-backend';

  constructor(public authService: AuthenticationServiceService) {
  }

}
