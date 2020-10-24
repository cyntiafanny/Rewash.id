import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {error} from '@angular/compiler/src/util';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  isSignIn: boolean;
  loginForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
      private authService: AuthService,
      private router: Router,
      private alertCtrl: AlertController
  ) {
    this.isSignIn = true;
  }

  ngOnInit() {
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

  async loginUser(credentials): Promise<void> {
    this.authService.login(credentials.login_email, credentials.login_password).then(
        () => {
          this.router.navigateByUrl('tabs/tab1');
        },
        // tslint:disable-next-line:no-shadowed-variable
        async error => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{text: 'OK', role: 'cancel'}]
          });
          await alert.present();
        }
    );
  }

  async signUpUser(credentials): Promise<void> {
    this.authService.signUp(credentials.signup_email, credentials.signup_password).then(
        () => {
          this.router.navigateByUrl('tabs/tab1');
        },
        // tslint:disable-next-line:no-shadowed-variable
        async error => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{text: 'OK', role: 'cancel'}]
          });
          await alert.present();
        }
    );
  }
}
