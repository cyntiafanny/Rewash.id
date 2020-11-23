import { ALL_SCENT } from './../../../constants/scent-list';
import { SCENT } from './../../../constants/scent-model';
import { Component, OnInit } from '@angular/core';
import { ALL_ITEMS } from '../../../constants/items-pricing';
import { Item } from '../../../constants/item-model';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import {element} from 'protractor';
registerLocaleData(localeId, 'id');

@Component({
  selector: 'app-laundry-selection',
  templateUrl: './laundry-selection.component.html',
  styleUrls: ['./laundry-selection.component.scss'],
})
export class LaundrySelectionComponent implements OnInit {
  AllScents: Array<SCENT> = [];
  constructor() { }

  ngOnInit() {
    this.AllScents = ALL_SCENT.SCENTS;
  }

}
