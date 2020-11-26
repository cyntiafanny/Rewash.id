import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PriceDetail } from '../../../constants/price-model';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order = new BehaviorSubject<PriceDetail>({
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
      WEIGHT: {}
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
