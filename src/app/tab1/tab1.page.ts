import {Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UserService } from '../services/users/user.service';
import { User } from '../services/users/user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getLoggedInUser();
    // console.log('===this.user', this.user);
    // console.log('===this.user.name', this.user.name);
  }

}
