import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotDePasseOubliePageRoutingModule } from './mot-de-passe-oublie-routing.module';

import { MotDePasseOubliePage } from './mot-de-passe-oublie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotDePasseOubliePageRoutingModule
  ],
  declarations: [MotDePasseOubliePage]
})
export class MotDePasseOubliePageModule {}
