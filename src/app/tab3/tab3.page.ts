import {Component, OnInit} from '@angular/core';
import { UserService } from '../services/users/user.service';
import {User} from "../services/users/user";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
  }

}
