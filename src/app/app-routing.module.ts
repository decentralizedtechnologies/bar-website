import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnlockRouteGuard } from '@guard/unlock-route.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: `./login/login.module#LoginModule`,
  },
  {
    path: 'contract/create',
    loadChildren: `./contract-create/contract-create.module#ContractCreateModule`,
    canActivate: [UnlockRouteGuard],
  },
  {
    path: 'contract/deploy',
    loadChildren: `./contract-deploy/contract-deploy.module#ContractDeployModule`,
    canActivate: [UnlockRouteGuard],
  },
  {
    path: 'contract/:contractAddress/details',
    loadChildren: `./contract-details/contract-details.module#ContractDetailsModule`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
