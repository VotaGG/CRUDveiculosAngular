import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    userLoggedIn: boolean;

    constructor(private router: Router, private afAuth: AngularFireAuth) {
        this.userLoggedIn = false;

        this.afAuth.onAuthStateChanged((user) => {
            if (user) {
                this.userLoggedIn = true;
            } else {
                this.userLoggedIn = false;
            }
        });
    }

    GoogleAuth() {
      return this.AuthLogin(new GoogleAuthProvider());
    }

    AuthLogin(provider: GoogleAuthProvider) {
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          console.log('You have been successfully logged in!');
        })
        .catch((error) => {
          console.log(error);
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
                result.user.sendEmailVerification();
                return result;
            }
        } catch (error) {
            console.log('Auth Service: signup error', error);
            throw error;
        }
    }
}
