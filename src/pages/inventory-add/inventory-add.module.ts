import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryAddPage } from './inventory-add';

@NgModule({
  declarations: [
    InventoryAddPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryAddPage),
  ],
})
export class InventoryAddPageModule {}
