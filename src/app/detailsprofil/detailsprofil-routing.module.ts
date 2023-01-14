import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsprofilPage } from './detailsprofil.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsprofilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsprofilPageRoutingModule {}
