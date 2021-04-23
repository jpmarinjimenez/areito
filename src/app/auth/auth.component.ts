import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css'],
})
export class AuthComponent {
    loginMode = true;

    constructor(private authService: AuthService) {}

    facebookSignInPopup(): void {
        this.authService.facebookSignInPopup();
    }

    changeMode () {
        this.loginMode = !this.loginMode;
    }
}
