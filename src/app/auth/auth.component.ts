import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css'],
})
export class AuthComponent {
    loginMode = true;

    constructor(private authService: AuthService, private router: Router) {}

    changeMode(): void {
        this.loginMode = !this.loginMode;
    }

    login(form: NgForm): void {
        if (!form.valid) {
            return;
        }

        this.authService.login(form.value);
    }

    register(form: NgForm): void {
        if (!form.valid) {
            return;
        }

        this.authService.register(form.value);
    }

    facebookSignInPopup(): void {
        this.authService.facebookSignInPopup();
    }
}
