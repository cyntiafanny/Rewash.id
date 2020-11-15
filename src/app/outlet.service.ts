import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Outlet} from "./outlet.model";

@Injectable({
  providedIn: 'root'
})
export class OutletService {
  public outlets: Outlet[] = [];

  constructor(
    private firestore: AngularFirestore,
  ) {
  }

  storeOutlet(outlets: Outlet[]) {
    this.outlets = outlets
  }

  getAllOutlets() {
    return [...this.outlets];
  }

  getOutlet(outletId: string) {
    return {
      ...this.outlets.find(outlet => {
        return outlet.id === outletId;
      })
    };
  }
}
