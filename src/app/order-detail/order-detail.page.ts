import { Component, OnInit } from '@angular/core';
import {OrderDetail} from '../../constants/order-model';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
registerLocaleData(localeId, 'id');
import { OTHER_PRICE } from '../../constants/other-price';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})

export class OrderDetailPage implements OnInit {
  orderDetail: OrderDetail;
  priceTotal: object;
  shippingInfo: any;
  OTHERS_PRICE: number;
  constructor() { }

  formatDateAndTime(shippingInfo: object) {
    console.log('===shippingInfo', shippingInfo);
    // @ts-ignore
    const pickupDate = new Date(shippingInfo.PICKUPTD);
    // @ts-ignore
    const deliveryDate = new Date(shippingInfo.DELIVERYTD);
    return {
      PICKUPTD: pickupDate.toDateString() + ' ' + pickupDate.toLocaleTimeString(),
      DELIVERYTD: deliveryDate.toDateString() + ' ' + deliveryDate.toLocaleTimeString()
    };
  }
  ngOnInit() {
    this.OTHERS_PRICE = OTHER_PRICE;
    // @ts-ignore
    this.orderDetail = {
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
          DESTINATION: 'Rewash Aeon Mall'
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
      }
    };
    this.priceTotal = this.orderDetail.DETAIL.PRICE.find((each) => each.NAME === 'Total Order Price');
    this.shippingInfo = this.formatDateAndTime(this.orderDetail.DETAIL.SHIPPING);
  }

}
