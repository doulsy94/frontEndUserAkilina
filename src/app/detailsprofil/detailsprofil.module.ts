import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsprofilPageRoutingModule } from './detailsprofil-routing.module';

import { DetailsprofilPage } from './detailsprofil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsprofilPageRoutingModule
  ],
  declarations: [DetailsprofilPage]
})
export class DetailsprofilPageModule {}
