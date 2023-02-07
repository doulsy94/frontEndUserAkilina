import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/connexion',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'accueil',
    loadChildren: () =>
      import('./accueil/accueil.module').then((m) => m.AccueilPageModule),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
  {
    path: 'profil',
    loadChildren: () =>
      import('./profil/profil.module').then((m) => m.ProfilPageModule),
  },
  {
    path: 'connexion',
    loadChildren: () =>
      import('./connexion/connexion.module').then((m) => m.ConnexionPageModule),
  },

  {
    path: 'ministere/:id',
    loadChildren: () =>
      import('./ministere/ministere.module').then((m) => m.MinisterePageModule),
  },
  {
    path: 'inscription',
    loadChildren: () =>
      import('./inscription/inscription.module').then(
        (m) => m.InscriptionPageModule
      ),
  },
  {
    path: 'commentaire/:id',
    loadChildren: () =>
      import('./commentaire/commentaire.module').then(
        (m) => m.CommentairePageModule
      ),
  },
  {
    path: 'vocal/:id',
    loadChildren: () =>
      import('./vocal/vocal.module').then((m) => m.VocalPageModule),
  },
  {
    path: 'password-update/:id',
    loadChildren: () =>
      import('./password-update/password-update.module').then(
        (m) => m.PasswordUpdatePageModule
      ),
  },

  {
    path: 'slider',
    loadChildren: () =>
      import('./slider/slider.module').then((m) => m.SliderPageModule),
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
