import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { OrderDetail } from '../../../constants/order-model';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order = new BehaviorSubject<OrderDetail>({
    SPECIAL: [
      {
        KEY: 'BATIK',
        NAME: 'Batik',
        PRICE: 50000,
        WEIGHT: 200,
        QTY: 1
      },
      {
        KEY: 'SHORT_DRESS',
        NAME: 'Short Dress',
        PRICE: 50000,
        WEIGHT: 200,
        QTY: 1
      },
      {
        KEY: 'BEDCOVER',
        NAME: 'Bedcover',
        PRICE: 50000,
        WEIGHT: 200,
        QTY: 1
      }
    ],
    NORMAL: [
      {
        KEY: 'SHORT_TOPS',
        NAME: 'Short Tops',
        PRICE: 50000,
        WEIGHT: 200,
        QTY: 1
      },
      {
        KEY: 'LONG_TOPS',
        NAME: 'Long Tops',
        PRICE: 50000,
        WEIGHT: 200,
        QTY: 1
      },
      {
        KEY: 'SHORT_BOTTOMS',
        NAME: 'Short Bottoms',
        PRICE: 50000,
        WEIGHT: 200,
        QTY: 1
      }
    ],
    OTHERS: [
      // @ts-ignore
      {
        KEY: '1327868128',
        NAME: 'Bantal',
        QTY: 4
      }
    ],
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
          PRICE: 150000
        },
        {
          NAME: 'Normal Items Price',
          PRICE: 6000
        },
        {
          NAME: 'Other Items Price',
          PRICE: 100000
        },
        {
          NAME: 'Total Order Price',
          PRICE: 256000
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

  constructor(
      private router: Router
  ) {}

  getOrder() {
    return this.order.asObservable();
  }

  setOrder(newOrder: any) {
    this.getOrder().pipe(distinctUntilChanged()).subscribe((orderData) => {
      console.log('===orderData', orderData);
      this.order.next(orderData = newOrder);
    });
    // @ts-ignore
    console.log('===this.order', this.order._value);
  }

  // setOrder(newOrder: any) {
  //   this.order.next(this.order = newOrder);
  //   console.log('===this.order', this.order);
  //   this.router.navigateByUrl('/input-items');
  // }
}
