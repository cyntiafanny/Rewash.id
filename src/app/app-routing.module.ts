import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'input-items',
    loadChildren: () => import('./input-items/input-items.module').then( m => m.InputItemsPageModule)
  },
  {
    path: 'outlet',
    loadChildren: () => import('./outlet/outlet.module').then( m => m.OutletPageModule)
  },
  {
    path: 'delivery-details',
    loadChildren: () => import('./delivery-details/delivery-details.module').then( m => m.DeliveryDetailsPageModule)
  },
  {
    path: 'laundry-details',
    loadChildren: () => import('./laundry-details/laundry-details.module').then( m => m.LaundryDetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
