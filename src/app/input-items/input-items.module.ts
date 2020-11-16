import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputItemsPageRoutingModule } from './input-items-routing.module';

import { InputItemsPage } from './input-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputItemsPageRoutingModule
  ],
  declarations: [InputItemsPage]
})
export class InputItemsPageModule {}
