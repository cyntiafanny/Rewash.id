import { Component } from '@angular/core';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private userService: UserService) {}

}
