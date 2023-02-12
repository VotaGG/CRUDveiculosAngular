import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(public afAuth: AngularFireAuth) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.afAuth.signOut();
    }

}
