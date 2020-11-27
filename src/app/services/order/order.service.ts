import {EventEmitter, Injectable, Output} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { OrderDetail } from '../../../constants/order-model';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {UserService} from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // order = new BehaviorSubject<OrderDetail>({
  //   SPECIAL: [
  //     {
  //       KEY: 'BATIK',
  //       NAME: 'Batik',
  //       PRICE: 50000,
  //       WEIGHT: 200,
  //       QTY: 1
  //     },
  //     {
  //       KEY: 'SHORT_DRESS',
  //       NAME: 'Short Dress',
  //       PRICE: 50000,
  //       WEIGHT: 200,
  //       QTY: 1
  //     },
  //     {
  //       KEY: 'BEDCOVER',
  //       NAME: 'Bedcover',
  //       PRICE: 50000,
  //       WEIGHT: 200,
  //       QTY: 1
  //     }
  //   ],
  //   NORMAL: [
  //     {
  //       KEY: 'SHORT_TOPS',
  //       NAME: 'Short Tops',
  //       PRICE: 50000,
  //       WEIGHT: 200,
  //       QTY: 1
  //     },
  //     {
  //       KEY: 'LONG_TOPS',
  //       NAME: 'Long Tops',
  //       PRICE: 50000,
  //       WEIGHT: 200,
  //       QTY: 1
  //     },
  //     {
  //       KEY: 'SHORT_BOTTOMS',
  //       NAME: 'Short Bottoms',
  //       PRICE: 50000,
  //       WEIGHT: 200,
  //       QTY: 1
  //     }
  //   ],
  //   OTHERS: [
  //     // @ts-ignore
  //     {
  //       KEY: '1327868128',
  //       NAME: 'Bantal',
  //       QTY: 4
  //     }
  //   ],
  //   DETAIL: {
  //     ORDERID: 'ASDFGHJKL12345',
  //     ADDITIONALS: {
  //       SCENT: 'Clean Cotton',
  //       REQUEST_BAG: false,
  //       NOTES: 'Tolong dicuci yang bersih ya!'
  //     },
  //     PRICE: [
  //       {
  //         NAME: 'Special Items Price',
  //         PRICE: 0
  //       },
  //       {
  //         NAME: 'Normal Items Price',
  //         PRICE: 0
  //       },
  //       {
  //         NAME: 'Other Items Price',
  //         PRICE: 0
  //       },
  //       {
  //         NAME: 'Total Order Price',
  //         PRICE: 0
  //       }
  //     ],
  //     WEIGHT: {
  //       normalItemsEstWeightTotal: 1,
  //       specialItemsEstWeightTotal: 1
  //     },
  //     SHIPPING: {
  //       DELIVERYTD: '2020-11-29T05:08:04.200Z',
  //       PICKUPTD: '2020-11-26T05:08:04.200Z',
  //       ORIGIN: 'Perumahan Lengkong Wetan',
  //       DESTINATION: 'Rewash Aeon Mall',
  //       OUTLETID: 'o1',
  //       USERID: 'BKOJAldnq4MDqqXLMhtE6WRRbSc2',
  //       NOTES: 'Yang bersih yaaa'
  //     },
  //     PROGRESS:  [
  //       {
  //         NAME: 'Order placed & confirmed',
  //         STATUS: true
  //       },
  //       {
  //         NAME: 'Driver on the way to pickup',
  //         STATUS: false
  //       },
  //       {
  //         NAME: 'Laundry picked up, delivering to outlet',
  //         STATUS: false
  //       },
  //       {
  //         NAME: 'Laundry received & confirmed by outlet',
  //         STATUS: false
  //       },
  //       {
  //         NAME: 'Laundry is being washed',
  //         STATUS: false
  //       },
  //       {
  //         NAME: 'Laundry is finished washing',
  //         STATUS: false
  //       },
  //       {
  //         NAME: 'Laundry is on the way!',
  //         STATUS: false
  //       },
  //       {
  //         NAME: 'Laundry has been received',
  //         STATUS: false
  //       }
  //     ]
  //   }});

  private dbPath = '/orders';
  ordersRef: AngularFireList<OrderDetail> = null;
  dbRef: any;
  orderDataSource = new BehaviorSubject<OrderDetail>({
    SPECIAL: [],
    NORMAL: [],
    OTHERS: [],
    DETAIL: {
      ORDERID: 'ASDFGHJKL12345',
      ADDITIONALS: {
        SCENT: 'Clean Cotton',
        REQUEST_BAG: false,
        NOTES: 'Tolong dicuci yang bersih ya!'
      },
      PRICE: [
        {
          NAME: 'Special Items Price',
          PRICE: 0
        },
        {
          NAME: 'Normal Items Price',
          PRICE: 0
        },
        {
          NAME: 'Other Items Price',
          PRICE: 0
        },
        {
          NAME: 'Total Order Price',
          PRICE: 0
        }
      ],
      WEIGHT: {
        normalItemsEstWeightTotal: 1,
        specialItemsEstWeightTotal: 1
      },
      SHIPPING: {
        DELIVERYTD: '2020-11-29T05:08:04.200Z',
        PICKUPTD: '2020-11-26T05:08:04.200Z',
        ORIGIN: 'Perumahan Lengkong Wetan',
        DESTINATION: 'Rewash Aeon Mall',
        OUTLETID: 'o1',
        USERID: 'BKOJAldnq4MDqqXLMhtE6WRRbSc2',
        NOTES: 'Yang bersih yaaa'
      },
      PROGRESS:  [
        {
          NAME: 'Order placed & confirmed',
          STATUS: true
        },
        {
          NAME: 'Driver on the way to pickup',
          STATUS: false
        },
        {
          NAME: 'Laundry picked up, delivering to outlet',
          STATUS: false
        },
        {
          NAME: 'Laundry received & confirmed by outlet',
          STATUS: false
        },
        {
          NAME: 'Laundry is being washed',
          STATUS: false
        },
        {
          NAME: 'Laundry is finished washing',
          STATUS: false
        },
        {
          NAME: 'Laundry is on the way!',
          STATUS: false
        },
        {
          NAME: 'Laundry has been received',
          STATUS: false
        }
      ]
    }});
  orderDataStreams = this.orderDataSource.asObservable();

  constructor(
      private router: Router,
      private db: AngularFireDatabase
  ) {
    this.ordersRef = db.list(this.dbPath);
  }

  setOrderData(newData) {
    this.orderDataStreams = newData;
    this.orderDataSource.next(newData);
    console.log('===AFTER SET this.orderDataStreams', this.orderDataStreams);
  }

  getOrderData() {
    return this.orderDataSource.asObservable();
  }

  getOngoingOrder(user: any): Promise<any>{
    /* Disini harusnya nerima user id dari tab1.page.ts
    * cuman ntah kenapa hasilnya tuh evaluated pas runtime jad undefined pas dikirim
    * kalau di console log 'Value Evaluated Just Now' messagenya
    * belum tau gimana cara dapetin langsung objectnya, kalo baca-baca sih katanya
    * harus pake subscribe tp belom cek
    * nanti harusnya jadi
    * this.db
    * .database.ref('orders/' + user.id) ........
    * */
    // console.log('===user', user);
    return this.db.database.ref('orders/ONuPibfPl1aHoQRF0RDb2h7XOPS2')
        .once('value').then((dataSnapshot) => {
          return dataSnapshot.val();
        });
  }
}
