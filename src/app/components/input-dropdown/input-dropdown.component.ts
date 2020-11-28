import { Component, OnInit } from '@angular/core';
import { ALL_ITEMS } from '../../../constants/items-pricing';
import { Item } from '../../../constants/item-model';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import {element} from 'protractor';
registerLocaleData(localeId, 'id');

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.scss'],
})
export class InputDropdownComponent implements OnInit {
  normalItems: Array<Item> = [];
  specialItems: Array<Item> = [];
  cart: Array<Item> = [];
  constructor() { }

  ngOnInit() {
    this.normalItems = ALL_ITEMS.NORMAL_ITEMS;
    this.specialItems = ALL_ITEMS.SPECIAL_ITEMS;
  }

  onRemoveNormalItem(key: any) {
    this.normalItems.forEach((obj: Item) => {
      if (obj.QTY > 0 && obj.KEY === key) {
        --obj.QTY;
      }
    });
  }

  onAddNormalItem(key: any) {
    this.normalItems.forEach((obj: Item) => {
      if (obj.KEY === key) {
        ++obj.QTY;
      }
    });
  }

  onRemoveSpecialItem(key: any) {
    this.specialItems.forEach((obj: Item) => {
      if (obj.QTY > 0 && obj.KEY === key) {
        --obj.QTY;
      }
    });
  }

  onAddSpecialItem(key: any) {
    this.specialItems.forEach((obj: Item) => {
      if (obj.KEY === key) {
        ++obj.QTY;
      }
    });
  }

  // ITEMS ADDED TO CART
  onNext() {
    const specialItemsRes = this.specialItems.filter(item => item.QTY > 0);
    const normalItemsRes = this.normalItems.filter(item => item.QTY > 0);
    console.log('===specialItemsRes', specialItemsRes);
    console.log('===normalItemsRes', normalItemsRes);
  }

}
