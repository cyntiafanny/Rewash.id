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
    DETAIL: {
      PRICE: [
        {
          name: 'Special Items Price',
          price: 0,
        },
        {
          name: 'Normal Items Price',
          price: 0,
        },
        {
          name: 'Other Items Price',
          price: 0,
        },
        {
          name: 'Total Order Price',
          price: 0,
        }
      ],
      WEIGHT: {},
      SHIPPING: {
        DELIVERYTD: '2020-11-26T05:08:04.200Z',
        PICKUPTD: '2020-11-29T05:08:04.200Z',
        ORIGIN: 'Perumahan Lengkong Wetan',
        DESTINATION: 'Rewash Aeon Mall'
      },
      PROGRESS:  [
        {
          name: 'Order placed & confirmed',
          status: false
        },
        {
          name: 'Driver on the way to pickup',
          status: false
        },
        {
          name: 'Laundry picked up, delivering to outlet',
          status: false
        },
        {
          name: 'Laundry received & confirmed by outlet',
          status: false
        },
        {
          name: 'Laundry is being washed',
          status: false
        },
        {
          name: 'Laundry is finished washing',
          status: false
        },
        {
          name: 'Laundry is on the way!',
          status: false
        },
        {
          name: 'Laundry has been received',
          status: false
        }
      ]
    },
    NORMAL: {},
    OTHERS: {},
    SPECIAL: {}
  });

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
