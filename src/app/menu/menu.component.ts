import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
    menuOpen: boolean = false;

    constructor(private authService: AuthService, private router: Router) {}

    toggleMenu = () => {
        this.menuOpen = !this.menuOpen;

        if (this.menuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    };

    logout() {
        this.authService
            .logout()
            .then(() => {
                this.router.navigate(['/']);
                this.toggleMenu();
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
