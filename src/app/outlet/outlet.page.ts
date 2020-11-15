import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Outlet} from "../outlet.model";
import {OutletService} from "../outlet.service";

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.page.html',
  styleUrls: ['./outlet.page.scss'],
})
export class OutletPage implements OnInit {
  outlet: Outlet[] = [];

  constructor(
    private outletService: OutletService,
    private db: AngularFireDatabase
  ) {
  }

  fetchOutletFromDatabase() {
    this.db.object('/outlet').valueChanges().subscribe(outlets => {
      {
        Object.keys(outlets).forEach(outletKey => {
          this.outlet.push({
            id: outletKey,
            name: outlets[outletKey].name,
            location: outlets[outletKey].location,
            longitude: outlets[outletKey].longitude,
            latitude: outlets[outletKey].latitude,
            openHours: outlets[outletKey].open_hours,
            rate: outlets[outletKey].rate,
            transactions: outlets[outletKey].transactions,
            points: outlets[outletKey].points,
            admin: outlets[outletKey].admin
          })
        })
      }
    });
  }

  ngOnInit() {
    this.fetchOutletFromDatabase();
    this.outletService.storeOutlet(this.outlet);
  }

  ionViewWillEnter() {
    this.fetchOutletFromDatabase();
    this.outletService.storeOutlet(this.outlet);
  }


}
