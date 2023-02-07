import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'accueil',
        loadChildren: () =>
          import('../accueil/accueil.module').then((m) => m.AccueilPageModule),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('../notification/notification.module').then(
            (m) => m.NotificationPageModule
          ),
      },
      {
        path: 'profil',
        loadChildren: () =>
          import('../profil/profil.module').then((m) => m.ProfilPageModule),
      },

      {
        path: '',
        redirectTo: '/connexion',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/connexion',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
