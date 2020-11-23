import { LaundrySelectionComponent } from './../components/laundry-selection/laundry-selection.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import { LaundryDetailsPage } from './laundry-details.page';
const routes: Routes = [
  {
    path: '',
    component: LaundryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, CommonModule],
  entryComponents: [LaundrySelectionComponent],
  declarations: [LaundrySelectionComponent],
  exports: [RouterModule, LaundrySelectionComponent],
})
export class LaundryDetailsPageRoutingModule {}
