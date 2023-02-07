import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinisterePageRoutingModule } from './ministere-routing.module';

import { MinisterePage } from './ministere.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MinisterePageRoutingModule],
  declarations: [MinisterePage],
})
export class MinisterePageModule {}
