import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css'],
})
export class AuthComponent {
    constructor(private authService: AuthService, private firebaseService: FirebaseService, private router: Router) {}

    facebookSignInPopup = () => {
        this.authService
            .facebookSignInPopup()
            .then((result) => {
                // const credential = result.credential as firebase.auth.OAuthCredential;
                const user = {
                    email: result.user.email,
                    displayName: 'Prueba',
                    status: 'online',
                };

                this.firebaseService.getUserData().subscribe((userData) => {
                    if (!userData) {
                        this.firebaseService.setUserData(user, result.user.uid);
                    }
                });

                this.router.navigate(['/chat']);
            })
            .catch((error) => console.log(error));
    };
}
