import { Component, OnInit } from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private splashScreen: SplashScreen) { }

  ngOnInit() {
      this.splashScreen.show();

      this.splashScreen.hide();
    }
}
