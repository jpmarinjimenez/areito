import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})
export class HomeComponent {
    userAuthenticated = false;
    constructor(private authService: AuthService) {
        this.authService.user.subscribe(
            (user) => {
                user ? (this.userAuthenticated = true) : (this.userAuthenticated = false);
            },
            (error) => console.log(error)
        );
    }
}