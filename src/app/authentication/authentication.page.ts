import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  isSignIn: boolean;
  loginForm: FormGroup;
  signUpForm: FormGroup;
  currentUser: any;

  constructor(
      private router: Router,
      private alertCtrl: AlertController,
      public auth: AngularFireAuth,
      private userService: UserService
  ) {
    this.isSignIn = true;
  }

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      console.log('===user', user);
      if (user) {
        this.router.navigateByUrl('tabs/tab1');
        this.currentUser = user;
      }
    });
    this.loginForm = new FormGroup({
      login_email: new FormControl(null, {
        updateOn: 'blur',
        validators: this.isSignIn ? [Validators.required] : []
      }),
      login_password: new FormControl(null, {
        updateOn: 'blur',
        validators: this.isSignIn ? [Validators.required] : []
      })
    });
    this.signUpForm = new FormGroup({
      signup_email: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isSignIn ? [Validators.required] : []
      }),
      signup_password: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isSignIn ? [Validators.required] : []
      }),
      signup_full_name: new FormControl(null, {
        updateOn: 'blur',
        validators: !this.isSignIn ? [Validators.required] : []
      }),
    });
  }

  switchCase() {
    this.isSignIn = !this.isSignIn;
  }


  // getCurrentUser() {
  //   return this.auth.currentUser();
  // }

  loginUser(credentials) {
    this.auth.signInWithEmailAndPassword(credentials.login_email, credentials.login_password)
      .then(() => {
        this.router.navigateByUrl('tabs/tab1');
      },
        // tslint:disable-next-line:no-shadowed-variable
        async error => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{text: 'OK', role: 'cancel'}]
          });
          await alert.present();
        });
  }

  signUpUser(credentials) {
    this.auth.createUserWithEmailAndPassword(credentials.signup_email, credentials.signup_password)
      .then((userCredential) => {
          this.userService.create(userCredential.user);
          this.router.navigateByUrl('tabs/tab1');
        },
        async error => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{text: 'OK', role: 'cancel'}]
          });
          await alert.present();
        });
  }

}
