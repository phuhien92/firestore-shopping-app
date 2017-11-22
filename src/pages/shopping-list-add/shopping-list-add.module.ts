import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListAddPage } from './shopping-list-add';

@NgModule({
  declarations: [
    ShoppingListAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListAddPage),
  ],
})
export class ShoppingListAddPageModule {}
