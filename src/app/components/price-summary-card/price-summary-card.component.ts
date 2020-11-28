import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { PRICE_SUMMARY } from '../../../constants/price-summary';
import { OrderDetail } from '../../../constants/order-model';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { OrderService } from '../../services/order/order.service';
import { Subscription } from 'rxjs';
registerLocaleData(localeId, 'id');

@Component({
  selector: 'app-price-summary-card',
  templateUrl: './price-summary-card.component.html',
  styleUrls: ['./price-summary-card.component.scss'],
  providers: [ OrderService ]
})
export class PriceSummaryCardComponent implements OnInit, OnDestroy {
  orderDetail: OrderDetail;
  private orderSummarySub: Subscription;
  todayDate: Date;
  maxDeliveryDate: string;
  minDeliveryDate: string;
  allowedHourValues: string;
  allowedMinuteValues: string;
  pickupDate: string;
  deliveryDetailPage: boolean;

  constructor(public orderService: OrderService) {}

  addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  changePickupDate(newPickupDate: string) {
    this.pickupDate = newPickupDate;
    // Calculate min & max delivery date
    this.minDeliveryDate = this.addDays(new Date(this.pickupDate), 1).toISOString().slice(0, 10);
    this.maxDeliveryDate = this.addDays(new Date(this.pickupDate), 7).toISOString().slice(0, 10);
  }

  ngOnInit() {
    this.orderSummarySub = this.orderService.getOrder().subscribe((orderData) => {
      console.log('===orderData', orderData);
      this.orderDetail = orderData;
    });
    console.log('===this.priceSummary', this.orderDetail);
    this.deliveryDetailPage = true;
    this.allowedHourValues = '7,8,9,10,11,12,13,14,15,16,17,18';
    this.allowedMinuteValues = '0,15,30,45';
    // Get today's date as minimum pickup date
    this.todayDate = new Date();
    this.pickupDate = this.todayDate.toISOString();
    this.changePickupDate(this.pickupDate);
  }

  ngOnDestroy() {
    if (this.orderSummarySub) {
      this.orderSummarySub.unsubscribe();
    }
  }

  onNextClick() {
      alert('Next is Clicked');
  }

}
