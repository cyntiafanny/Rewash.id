import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.page.html',
  styleUrls: ['./outlet.page.scss'],
})
export class OutletPage implements OnInit {

  constructor(
    private db: AngularFireDatabase
  ) {
    const outlet = db.list('/').valueChanges().subscribe(sin => {
      console.log(sin)
    });
    console.log(outlet)
  }

  ngOnInit() {
  }


}
