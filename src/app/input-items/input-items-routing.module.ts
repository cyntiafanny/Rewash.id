import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputItemsPage } from './input-items.page';
import { InputDropdownComponent } from '../components/input-dropdown/input-dropdown.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: InputItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, CommonModule],
  entryComponents: [InputDropdownComponent],
  declarations: [InputDropdownComponent],
  exports: [RouterModule, InputDropdownComponent],
})
export class InputItemsPageRoutingModule {}
