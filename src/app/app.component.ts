import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService) {
      this.auth.user$.subscribe(user => {
        if(user) {
          userService.save(user);
        }
      });
  }
}
