import {Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  user: any;

  constructor() {}

  ngOnInit() {}

}
