import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

    constructor(private router: Router, private afAuth: AngularFireAuth) {
        this.userLoggedIn = false;

        this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
            if (user) {
                this.userLoggedIn = true;
            } else {
                this.userLoggedIn = false;
            }
        });
    }

    async loginUser(email: string, password: string): Promise<any> {
        try {
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            console.log('Auth Service: loginUser: success');
            return result;
        } catch (error) {
            console.log('Auth Service: login error...');
            console.log('error', error);
            throw error;
        }
    }

    async signupUser(user: any): Promise<any> {
        try {
            const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
            if (result && result.user) {
                let emailLower = user.email.toLowerCase();
                result.user.sendEmailVerification();                    // immediately send the user a verification email
                return result;
            }
        } catch (error) {
            console.log('Auth Service: signup error', error);
            throw error;
        }
    }
}
