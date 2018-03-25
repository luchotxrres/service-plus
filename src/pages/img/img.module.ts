import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgPage } from './img';

@NgModule({
  declarations: [
    ImgPage,
  ],
  imports: [
    IonicPageModule.forChild(ImgPage),
  ],
})
export class ImgPageModule {}
