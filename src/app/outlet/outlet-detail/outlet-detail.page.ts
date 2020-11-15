import { Component, OnInit } from '@angular/core';
import {Outlet} from "../../outlet.model";
import {ActivatedRoute} from "@angular/router";
import {OutletService} from "../../outlet.service";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
  selector: 'app-outlet-detail',
  templateUrl: './outlet-detail.page.html',
  styleUrls: ['./outlet-detail.page.scss'],
})
export class OutletDetailPage implements OnInit {
  outlet: Outlet[] = [];
  loadedOutlet: Outlet;
  fullStar: number;
  halfStar: boolean = false;
  emptyStar: number = 5;
  rating: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private outletService: OutletService,
    private db: AngularFireDatabase
  ) {}

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
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('outletId')) {
        return;
      }
      const outletId = paramMap.get('outletId');
      this.loadedOutlet = this.outletService.getOutlet(outletId);
      this.rating = this.loadedOutlet.points / this.loadedOutlet.transactions;
      this.fullStar = Math.floor(this.rating);
      if(this.rating%1 != 0) {
        this.halfStar = true;
        this.emptyStar = this.emptyStar - this.fullStar - 1;
      }
      else {
        this.emptyStar = this.emptyStar - this.fullStar;
      }
    });
  }

}
