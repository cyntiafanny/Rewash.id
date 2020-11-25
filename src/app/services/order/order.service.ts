import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: any;

  constructor() {}

  setOrder(newOrder: any) {
    this.order = newOrder;
  }

  getOrder() {
    return this.order;
  }
}
