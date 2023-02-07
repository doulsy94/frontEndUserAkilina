import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinisterePage } from './ministere.page';

const routes: Routes = [
  {
    path: '',
    component: MinisterePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinisterePageRoutingModule {}
