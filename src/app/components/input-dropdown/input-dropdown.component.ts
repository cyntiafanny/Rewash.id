import { Component, OnInit } from '@angular/core';
import { ALL_ITEMS } from '../../../constants/items-pricing';
import { Item } from '../../../constants/item-model';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import {element} from 'protractor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
registerLocaleData(localeId, 'id');
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.scss'],
})
export class InputDropdownComponent implements OnInit {
  constructor(
      public toastController: ToastController,
      public alertController: AlertController
  ) { }

  normalItems: Array<Item> = [];
  specialItems: Array<Item> = [];
  otherItems: Array<any> = [];
  cart: Array<Item> = [];
  isGeneralMenuHidden: boolean;
  isSpecialMenuHidden: boolean;
  isOthersMenuHidden: boolean;
  addOtherItemForm: FormGroup;
  count: number;
  hasAlertBeenShown: boolean;

  ngOnInit() {
    this.count = 0;
    this.hasAlertBeenShown = false;
    this.normalItems = ALL_ITEMS.NORMAL_ITEMS;
    this.specialItems = ALL_ITEMS.SPECIAL_ITEMS;
    this.addOtherItemForm = new FormGroup({
      other_item_name: new FormControl(null, {
        updateOn: 'blur',
        validators: Validators.required
      }),
      other_item_qty: new FormControl(null, {
        updateOn: 'blur',
        validators: Validators.required
      })
    });
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

  onRemoveOtherItem(key: any) {
    this.otherItems.forEach((obj: Item) => {
      if (obj.QTY > 0 && obj.KEY === key) {
        --obj.QTY;
      }
    });
  }

  onAddOtherItem(key: any) {
    this.otherItems.forEach((obj: Item) => {
      if (obj.KEY === key) {
        ++obj.QTY;
      }
    });
  }

  // DELETE ITEM ALERT
  async deleteOtherItem(itemKeyToDelete: string) {
    const alert = await this.alertController.create({
      header: 'Delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.otherItems = this.otherItems.filter((item) => item.KEY !== itemKeyToDelete);
          }
        }
      ]
    });

    await alert.present();
  }


  // ITEMS ADDED TO CART
  onNext() {
    const specialItemsRes = this.specialItems.filter(item => item.QTY > 0);
    const normalItemsRes = this.normalItems.filter(item => item.QTY > 0);
    console.log('===specialItemsRes', specialItemsRes);
    console.log('===normalItemsRes', normalItemsRes);
  }

  // TOGGLE GENERAL MENU
  toggleGeneralMenu() {
    this.isGeneralMenuHidden = !this.isGeneralMenuHidden;
  }

  // TOGGLE SPECIAL MENU
  toggleSpecialMenu() {
    this.isSpecialMenuHidden = !this.isSpecialMenuHidden;
  }

  // TOGGLE OTHERS MENU
  toggleOthersMenu() {
    if (!this.hasAlertBeenShown) {
      this.presentAlert();
    }
    this.isOthersMenuHidden = !this.isOthersMenuHidden;
  }

  // HASH KEY FOR OTHER ITEM (TAKUT ADA YANG NAMANYA SAMA DOUBLE)
  hashCode = (s) => s.split('').reduce((a, b) => {
    // tslint:disable-next-line:no-bitwise
    a = (( a << 5 ) - a ) + b.charCodeAt(0);
    // tslint:disable-next-line:no-bitwise
    return a & a + Math.random();
  }, 0)

  // OTHER ITEM
  addOtherItem(newItem) {
    const { other_item_name, other_item_qty } = newItem;
    this.count++;
    if (other_item_name !== null || other_item_qty !== null) {
      this.otherItems.push({
        KEY: Math.abs(this.hashCode(newItem.other_item_name + this.count)),
        NAME: other_item_name,
        QTY: other_item_qty
      });
      console.log('===arr', this.otherItems);
      this.addOtherItemForm.reset();
      this.presentToast('Item has been added!', 'success');
    } else {
      this.presentToast('Input can\'t be empty!', 'danger');
    }
  }

  // DYNAMIC TOAST
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  // STORE ALERT
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Store Policy',
      message: '*Please make sure you have already checked the item you will input isn\'t already listed on categories above.\n Also please note you will be charged according to our store policy.',
      buttons: ['OK']
    });
    await alert.present().then(() => {
      this.hasAlertBeenShown = true;
    });
  }
}
