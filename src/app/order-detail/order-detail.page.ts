import { Component, OnInit } from '@angular/core';
import {PriceDetail} from '../../constants/price-model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  temp: PriceDetail;
  constructor() { }

  ngOnInit() {
    this.temp = {
      "SPECIAL": [
        {
          "KEY": "BATIK",
          "NAME": "Batik",
          "PRICE": 50000,
          "WEIGHT": 200,
          "QTY": 1
        },
        {
          "KEY": "SHORT_DRESS",
          "NAME": "Short Dress",
          "PRICE": 50000,
          "WEIGHT": 200,
          "QTY": 1
        },
        {
          "KEY": "BEDCOVER",
          "NAME": "Bedcover",
          "PRICE": 50000,
          "WEIGHT": 200,
          "QTY": 1
        }
      ],
      "NORMAL": [
        {
          "KEY": "SHORT_TOPS",
          "NAME": "Short Tops",
          "PRICE": 50000,
          "WEIGHT": 200,
          "QTY": 1
        },
        {
          "KEY": "LONG_TOPS",
          "NAME": "Long Tops",
          "PRICE": 50000,
          "WEIGHT": 200,
          "QTY": 1
        },
        {
          "KEY": "SHORT_BOTTOMS",
          "NAME": "Short Bottoms",
          "PRICE": 50000,
          "WEIGHT": 200,
          "QTY": 1
        }
      ],
      "OTHERS": [
        {
          "KEY": "1327868128",
          "NAME": "Bantal",
          "QTY": 4
        }
      ],
      "DETAILS": {
        "PRICE": [
          {
            "name": "Special Items Price",
            "price": 150000
          },
          {
            "name": "Normal Items Price",
            "price": 6000
          },
          {
            "name": "Other Items Price",
            "price": 100000
          },
          {
            "name": "Total Order Price",
            "price": 256000
          }
        ],
        "WEIGHT": {
          "normalItemsEstWeightTotal": 1,
          "specialItemsEstWeightTotal": 1
        }
      }
    };
  }

}
